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

const chalk = require('chalk');

class ConciseLogging {
    constructor({ name = 'ConciseLogger', time_format = 24, unix = false } = {}) {
        this.name = name;
        this.time_format = time_format;
        this.unix = unix;
        this.LEVELS = {
            TRACE: 5,
            DEBUG: 10,
            INFO: 20,
            WARN: 30,
            ERROR: 40,
            FATAL: 50
        };

        this.COLORS = {
            TRACE: chalk.cyanBright,
            DEBUG: chalk.blueBright,
            INFO: chalk.greenBright,
            WARN: chalk.yellowBright,
            ERROR: chalk.redBright,
            FATAL: chalk.red
        };
    }

    format(level, message, extraLevels = []) {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        let timeStr;
        if (this.time_format === 12) {
            const period = now.getHours() >= 12 ? 'PM' : 'AM';
            const hour12 = String((now.getHours() % 12) || 12).padStart(2, '0');
            timeStr = `${day}/${month}/${year} ${hour12}:${minutes}:${seconds} ${period}`;
        } else {
            timeStr = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        }

        if (this.unix) {
            const unixTimestamp = Math.floor(now.getTime() / 1000);
            timeStr = `${timeStr} ${unixTimestamp}`;
        }

        const color = this.COLORS[level] || ((text) => text);
        const brightText = chalk.white.bold;
        const extra = extraLevels.length > 0
            ? extraLevels.map(tag => `[${brightText(tag)}]`).join(' ') + ' '
            : '';

        return `[${timeStr}] [${color(level)}] ${extra}${message}`;
    }

    log(level, ...extraLevels) {
        const message = extraLevels.pop();
        const upperLevel = level.toUpperCase();
        console.log(this.format(upperLevel, message, extraLevels));
    }

    trace(...extraLevels) {
        this.log('TRACE', ...extraLevels);
    }

    debug(...extraLevels) {
        this.log('DEBUG', ...extraLevels);
    }

    info(...extraLevels) {
        this.log('INFO', ...extraLevels);
    }

    warn(...extraLevels) {
        this.log('WARN', ...extraLevels);
    }

    error(...extraLevels) {
        this.log('ERROR', ...extraLevels);
    }

    fatal(...extraLevels) {
        this.log('FATAL', ...extraLevels);
    }
}

module.exports = ConciseLogging;
