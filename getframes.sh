#!/bin/bash

if [ -f "badapple.webm" ]; then
    if [ -f "frames" ]; then
        rm frames/*
    fi
    mkdir -p frames
    ffmpeg -i badapple.webm frames/frame_%d.png
else
    echo "badapple.webm is missing."
fi
