# converting images for emojis

## monochrome

    convert [in] -threshold 50% [out]

## replace black with cyan

    convert [in] -fill cyan -opaque black [out]

## convert white to transparent

    convert [in] -transparent white [out]

## convert from greyscale to cyanscale

    convert original/destiny.jpg +level-colors cyan,white destiny-cyan.png

    convert destiny-cyan.png  -fuzz 20% -transparent white destiny-tc.png

    convert destiny-tc.png -trim +repage destiny-trim.png