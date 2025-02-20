from setuptools import setup

setup(
    name="concise-logging",
    version="1.0.0",
    author="RuskyDev",
    author_email="iamayaanalee@gmail.com",
    description="An advanced yet easy-to-use logging library.",
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
)
