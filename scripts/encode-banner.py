from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
paths = sorted((root / '.frames').glob('*.png'))
if len(paths) != 120:
    raise SystemExit('Render the 120 SVG frames first.')
reference = Image.open(paths[0]).convert('RGB').quantize(colors=96)
frames = [Image.open(p).convert('RGB').quantize(palette=reference, dither=Image.Dither.NONE) for p in paths]
destination = root / 'assets/ysh-banner-animated.gif'
frames[0].save(destination, save_all=True, append_images=frames[1:], duration=70, loop=0, optimize=True, disposal=1)
with Image.open(destination) as result:
    if result.n_frames < 100 or result.size != (1280, 360):
        raise SystemExit('Unexpected GIF output.')
print(f'Encoded {result.n_frames} frames; {destination.stat().st_size:,} bytes.')
