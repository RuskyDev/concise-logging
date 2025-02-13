#   ____            _          
#  |  _ \ _   _ ___| | ___   _ 
#  | |_) | | | / __| |/ / | | |
#  |  _ <| |_| \__ \   <| |_| |
#  |_| \_\\__,_|___/_|\_\\__, |
#                        |___/  
# © 2025 RuskyDev - https://rusky.is-a.dev
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, subject to the following conditions:
#
# 1. The above copyright notice and this permission notice shall be included
#    in all copies or substantial portions of the Software.
#
# 2. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
#    OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
#    FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL
#    THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER
#    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING
#    FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
#    IN THE SOFTWARE.

import logging
import datetime
import colorama

colorama.init(autoreset=True)

class ConciseFormatter(logging.Formatter):
    COLORS = {
        "TRACE": colorama.Fore.LIGHTCYAN_EX,
        "DEBUG": colorama.Fore.LIGHTBLUE_EX,
        "INFO": colorama.Fore.LIGHTGREEN_EX,
        "WARN": colorama.Fore.LIGHTYELLOW_EX,
        "ERROR": colorama.Fore.LIGHTRED_EX,
        "FATAL": colorama.Fore.RED
    }

    def __init__(self, time_format=24, unix=False):
        self.time_format = time_format
        self.unix = unix
        super().__init__()

    def format(self, record):
        now = datetime.datetime.now()
        
        if self.time_format == 12:
            time_str = now.strftime("%d/%m/%Y %I:%M:%S %p")
        else:
            time_str = now.strftime("%d/%m/%Y %H:%M:%S")

        if self.unix:
            unix_timestamp = int(now.timestamp())
            time_str = f"{time_str} {unix_timestamp}"

        level = record.levelname
        color = self.COLORS.get(level, "")
        
        bright_text = colorama.Style.BRIGHT + colorama.Fore.WHITE
        extra_levels = " ".join(f"[{bright_text}{tag}{colorama.Style.RESET_ALL}]" for tag in getattr(record, "extra_levels", []))
        
        message = record.getMessage()

        return f"[{time_str}] [{color}{level}{colorama.Fore.RESET}] {extra_levels} {message}"

class ConciseLogging:
    LEVELS = {
        "TRACE": 5,
        "DEBUG": 10,
        "INFO": 20,
        "WARN": 30,
        "ERROR": 40,
        "FATAL": 50
    }

    def __init__(self, name="ConciseLogger", time_format=24, unix=False):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(logging.DEBUG)
        
        for level_name, level_value in self.LEVELS.items():
            logging.addLevelName(level_value, level_name)

        if not self.logger.hasHandlers():
            console_handler = logging.StreamHandler()
            console_handler.setFormatter(ConciseFormatter(time_format, unix))
            self.logger.addHandler(console_handler)

    def log(self, level, *extra_levels, message):
        level = level.upper()
        lvl_value = self.LEVELS.get(level, logging.INFO)
        self.logger.log(lvl_value, message, extra={"extra_levels": extra_levels})

    def trace(self, *extra_levels, message):
        self.log("TRACE", *extra_levels, message=message)

    def debug(self, *extra_levels, message):
        self.log("DEBUG", *extra_levels, message=message)

    def info(self, *extra_levels, message):
        self.log("INFO", *extra_levels, message=message)

    def warn(self, *extra_levels, message):
        self.log("WARN", *extra_levels, message=message)

    def error(self, *extra_levels, message):
        self.log("ERROR", *extra_levels, message=message)

    def fatal(self, *extra_levels, message):
        self.log("FATAL", *extra_levels, message=message)