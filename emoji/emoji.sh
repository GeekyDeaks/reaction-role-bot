#! /bin/sh
set -e

if [ $# -lt 3 ]; then
	echo usage: $0 [in] [out] [colour]
	exit 1
fi

IN=$1
OUT=$2
COLOUR=$3

convert ${IN} +level-colors ${COLOUR},white ${OUT}
convert ${OUT} -fuzz 20% -transparent white ${OUT}
convert ${OUT} -trim +repage -resize 100x100 ${OUT}

