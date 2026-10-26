# Personal interest icons

These are original procedural Blender models for Zia Louise Mariano's portfolio.
The source file is zia-interest-icons.blend, created using Blender 4.5 LTS.

Each of the twelve named collections contains editable geometry and materials:
shopping, exploring, pasta, bread, fruit, salad, dogs, photography, writing,
drawing and painting, building, and thinking and logic.

Open the .blend file to see every model arranged as a contact sheet. All models,
materials, the product camera, and three studio lights are included. No external
textures, downloaded models, or add-ons are needed.

To render an individual model from the saved file, hide the other model
collections from rendering, move that collection to the origin, and frame it
with the orthographic camera. Or regenerate the exact website renders with:

    blender --background --threads 6 --python scripts/build-interest-icons.py
    node scripts/prepare-interest-previews.mjs

The script rebuilds each icon, renders transparent PNGs into public/interests,
and saves the editable contact-sheet scene here. WebP exports in public/interests
are used by the website. The browser never loads the .blend file or a 3D engine.

The burgundy, green, golden-yellow, and cream materials are named in the
Materials panel. The modelling and rendering source is in
scripts/build-interest-icons.py.
