from PIL import Image
import os

src = "/home/ubuntu/vendas-dompsa-pwa/icons/icon-base.png"
out_dir = "/home/ubuntu/vendas-dompsa-pwa/icons"

img = Image.open(src).convert("RGBA")

# Tamanhos necessários para iOS PWA e manifest
sizes = [
    (57, "apple-touch-icon-57x57.png"),
    (60, "apple-touch-icon-60x60.png"),
    (72, "apple-touch-icon-72x72.png"),
    (76, "apple-touch-icon-76x76.png"),
    (114, "apple-touch-icon-114x114.png"),
    (120, "apple-touch-icon-120x120.png"),
    (144, "apple-touch-icon-144x144.png"),
    (152, "apple-touch-icon-152x152.png"),
    (167, "apple-touch-icon-167x167.png"),
    (180, "apple-touch-icon-180x180.png"),
    (192, "icon-192x192.png"),
    (512, "icon-512x512.png"),
    (180, "apple-touch-icon.png"),  # default apple touch icon
]

for size, name in sizes:
    resized = img.resize((size, size), Image.LANCZOS)
    # Convert to RGB for non-transparent icons (iOS apple-touch-icon)
    if "apple" in name:
        bg = Image.new("RGB", (size, size), (8, 12, 20))
        bg.paste(resized, mask=resized.split()[3])
        bg.save(os.path.join(out_dir, name), "PNG")
    else:
        resized.save(os.path.join(out_dir, name), "PNG")
    print(f"Generated: {name} ({size}x{size})")

# Gerar splash screens para iPhone
splash_sizes = [
    (2048, 2732, "splash-2048x2732.png"),   # iPad Pro 12.9"
    (1668, 2388, "splash-1668x2388.png"),   # iPad Pro 11"
    (1536, 2048, "splash-1536x2048.png"),   # iPad Air/Mini
    (1125, 2436, "splash-1125x2436.png"),   # iPhone X/XS
    (1242, 2688, "splash-1242x2688.png"),   # iPhone XS Max
    (828, 1792, "splash-828x1792.png"),     # iPhone XR
    (1170, 2532, "splash-1170x2532.png"),   # iPhone 12/13/14
    (1284, 2778, "splash-1284x2778.png"),   # iPhone 12/13/14 Pro Max
    (1179, 2556, "splash-1179x2556.png"),   # iPhone 14 Pro
    (1290, 2796, "splash-1290x2796.png"),   # iPhone 14 Pro Max
    (750, 1334, "splash-750x1334.png"),     # iPhone 8/SE
    (1080, 1920, "splash-1080x1920.png"),   # iPhone 8 Plus
]

icon_for_splash = img.resize((200, 200), Image.LANCZOS)

for w, h, name in splash_sizes:
    splash = Image.new("RGB", (w, h), (8, 12, 20))
    # Adicionar gradiente azul sutil
    from PIL import ImageDraw
    draw = ImageDraw.Draw(splash)
    # Colocar ícone centralizado
    x = (w - 200) // 2
    y = (h - 200) // 2
    splash.paste(icon_for_splash, (x, y), mask=icon_for_splash.split()[3])
    splash.save(os.path.join(out_dir, name), "PNG")
    print(f"Generated splash: {name} ({w}x{h})")

print("All icons and splash screens generated!")
