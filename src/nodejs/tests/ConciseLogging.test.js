//   ____            _          
//  |  _ \ _   _ ___| | ___   _ 
//  | |_) | | | / __| |/ / | | |
//  |  _ <| |_| \__ \   <| |_| |
//  |_| \_\\__,_|___/_|\_\\__, |
//                        |___/  
// © 2025 RuskyDev - https://rusky.is-a.dev
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, subject to the following conditions:
//
// 1. The above copyright notice and this permission notice shall be included
//    in all copies or substantial portions of the Software.
//
// 2. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//    OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//    FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL
//    THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER
//    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING
//    FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
//    IN THE SOFTWARE.

const ConciseLogging = require('../ConciseLogging');

describe('ConciseLogging Configuration Tests', () => {
    const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];
    const tags = ['MODULE1', 'MODULE2'];
    const messages = {
        trace: 'This is a trace message',
        debug: 'This is a debug message',
        info: 'This is an info message',
        warn: 'This is a warning',
        error: 'This is an error',
        fatal: 'This is a fatal error',
        taggedInfo: 'This is an info message with tags',
        taggedError: 'Server crashed!'
    };

    const configs = [
        { time_format: 24, unix: false },
        { time_format: 24, unix: true },
        { time_format: 12, unix: false },
        { time_format: 12, unix: true }
    ];

    configs.forEach(({ time_format, unix }) => {
        describe(`time_format: ${time_format}, unix: ${unix}`, () => {
            let logger;
            let consoleSpy;

            beforeEach(() => {
                consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
                logger = new ConciseLogging({ time_format, unix });
            });

            afterEach(() => {
                consoleSpy.mockRestore();
            });

            logLevels.forEach(level => {
                it(`should log ${level} correctly`, () => {
                    logger[level](messages[level]);
                    expect(consoleSpy).toHaveBeenCalled();
                });
            });

            it('should log info with tags correctly', () => {
                logger.info(...tags, messages.taggedInfo);
                expect(consoleSpy).toHaveBeenCalled();
            });

            it('should log error with tags correctly', () => {
                logger.error('CRITICAL', 'SERVER', messages.taggedError);
                expect(consoleSpy).toHaveBeenCalled();
            });
        });
    });
});
