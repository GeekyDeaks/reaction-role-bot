#! /bin/sh
set -e

if [ $# -lt 2 ]; then
	echo usage: $0 [in] [out]
	exit 1
fi

IN=$1
OUT=$2

#convert ${IN} +level-colors ${COLOUR},white ${OUT}
#convert ${OUT} -fuzz 20% -transparent white ${OUT}
convert ${IN} -trim +repage -resize 100x100 -gravity center -background white -extent 106x106  ${OUT}

convert ${OUT} -alpha set -virtual-pixel transparent -channel A \
          -blur 0x8  -threshold 50% +channel ${OUT}

