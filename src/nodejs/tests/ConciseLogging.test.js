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
