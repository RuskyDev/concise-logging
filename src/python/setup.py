from setuptools import setup

with open('README.md', 'r', encoding='utf-8') as fh:
    long_description = fh.read()

setup(
    name="concise-logging",
    version="1.0.2",
    author="RuskyDev",
    author_email="iamayaanalee@gmail.com",
    description="An advanced yet easy-to-use logging library.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    py_modules=["ConciseLogging"],
    install_requires=[
        "colorama"
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
    keywords=[
        "logging",
        "advanced logging",
        "easy to use logging",
        "console logging",
        "log levels",
        "custom logger",
        "colorful logging",
        "python logger",
        "python logging",
        "time format logging",
        "unix timestamp logging"
    ],
)
