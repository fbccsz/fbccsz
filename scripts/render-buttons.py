"""Render the local SVG action buttons used by the profile README."""
from pathlib import Path
from html import escape

OUTPUT = Path(__file__).resolve().parent.parent / "assets" / "buttons"

ICONS = {
    "portfolio": '<rect x="1" y="2" width="16" height="14" rx="2"/><path d="M1 6h16M4 4h.01M7 4h.01"/>',
    "projetos": '<rect x="1" y="1" width="6" height="6" rx="1"/><rect x="11" y="1" width="6" height="6" rx="1"/><rect x="1" y="11" width="6" height="6" rx="1"/><rect x="11" y="11" width="6" height="6" rx="1"/>',
    "contato": '<rect x="1" y="3" width="16" height="12" rx="2"/><path d="m2 4 7 5 7-5"/>',
    "codigo": '<path d="m6 4-5 5 5 5m6-10 5 5-5 5m-2-12-2 16"/>',
    "demo": '<path d="m6 2 10 7-10 7z"/>',
    "docs": '<path d="M9 3C6 1 3 1 1 2v13c3-1 5-1 8 1 3-2 5-2 8-1V2c-3-1-5-1-8 1v13"/>',
    "jogar": '<path d="M5 5h8c2 0 4 8 3 10-1 2-4-1-5-2H7c-2 2-4 4-5 2C1 13 3 5 5 5zM4 8v4m-2-2h4m6-1h.01m2 2h.01"/>',
}

LABELS = {
    "portfolio": ("PORTFÓLIO", True),
    "projetos": ("PROJETOS", False),
    "contato": ("CONTATO", False),
    "codigo": ("CÓDIGO", False),
    "demo": ("DEMO", True),
    "docs": ("DOCS", False),
    "jogar": ("JOGAR", True),
}

def render(name: str, label: str, primary: bool) -> str:
    fill, stroke, ink = ("#f0f4f8", "#cbd5df", "#11161b") if primary else ("#11161b", "#303941", "#f0f4f8")
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="132" height="44" viewBox="0 0 132 44" role="img" aria-labelledby="title">
<title id="title">{escape(label)}</title>
<rect x=".5" y=".5" width="131" height="43" rx="8" fill="{fill}" stroke="{stroke}"/>
<g transform="translate(12 13)" fill="none" stroke="{ink}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">{ICONS[name]}</g>
<text x="39" y="26.5" fill="{ink}" font-family="Arial,Helvetica,sans-serif" font-size="10.5" font-weight="700" letter-spacing=".6">{escape(label)}</text>
<path d="M113 17h6v6m0-6-8 8" fill="none" stroke="{ink}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'''

def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for name, (label, primary) in LABELS.items():
        (OUTPUT / (name + ".svg")).write_text(render(name, label, primary), encoding="utf-8")
    print(f"Rendered {len(LABELS)} local SVG buttons.")

if __name__ == "__main__":
    main()
