#!/bin/bash
cd /opt/potapov.me
pm2 start npm --name "potapov-me" -- start
echo $! > /root/.pm2/pm2.pid
