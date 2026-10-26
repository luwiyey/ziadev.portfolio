"""Run with Blender: blender -b --python scripts/build-interest-icons.py.

Builds editable objects, renders transparent icons, and saves a contact-sheet
scene. Uses Blender only; no downloaded models or external textures.
"""
import bpy
import math
import os
from mathutils import Vector

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT = os.path.join(ROOT, "public", "interests")
SOURCE = os.path.join(ROOT, "design", "blender")
os.makedirs(OUTPUT, exist_ok=True)
os.makedirs(SOURCE, exist_ok=True)
bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)
for collection in list(bpy.data.collections):
    if collection.name != "Collection":
        bpy.data.collections.remove(collection)

def material(name, hex_color, metallic=0.0, roughness=0.3):
    srgb = tuple(int(hex_color[i:i+2], 16) / 255 for i in (0, 2, 4))
    color = tuple(value / 12.92 if value <= .04045 else ((value + .055) / 1.055) ** 2.4
                  for value in srgb)
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1)
    mat.use_nodes = True
    shader = mat.node_tree.nodes.get("Principled BSDF")
    shader.inputs["Base Color"].default_value = (*color, 1)
    shader.inputs["Metallic"].default_value = metallic
    shader.inputs["Roughness"].default_value = roughness
    return mat

M = {
    "red": material("Oxblood enamel", "8E203C", 0.12),
    "cherry": material("Cherry red", "C83D46", 0.05),
    "cream": material("Warm porcelain", "F5E8D1"),
    "green": material("Olive green", "597445"),
    "leaf": material("Fresh leaf", "82A44B"),
    "gold": material("Golden yellow", "E6B44D", 0.2),
    "metal": material("Brushed brass", "BF9142", 0.65),
    "dark": material("Warm charcoal", "292827", 0.1),
    "glass": material("Lens glass", "354B53", 0.5, 0.16),
    "bread": material("Golden bread crust", "BD7437"),
    "crumb": material("Bread crumb", "F1C982"),
    "brown": material("Cocoa fur", "785040"),
    "white": material("Paper and highlights", "FFF9ED"),
}
current = None
collections = []

def start(name):
    global current
    current = bpy.data.collections.new(name)
    bpy.context.scene.collection.children.link(current)
    collections.append(current)

def finish_object(obj, name, mat):
    obj.name = name
    for collection in list(obj.users_collection):
        collection.objects.unlink(obj)
    current.objects.link(obj)
    obj.data.materials.append(M[mat])
    if obj.type == "MESH":
        for poly in obj.data.polygons:
            poly.use_smooth = True
    return obj

def sphere(name, pos, scale, mat):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=40, ring_count=24, location=pos)
    obj = bpy.context.object
    obj.scale = scale
    return finish_object(obj, name, mat)

def box(name, pos, dimensions, mat, bevel=0.1, rotation=None):
    bpy.ops.mesh.primitive_cube_add(size=1, location=pos)
    obj = bpy.context.object
    obj.scale = dimensions
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if rotation:
        obj.rotation_euler = rotation
    modifier = obj.modifiers.new("Soft rounded edges", "BEVEL")
    modifier.width = bevel
    modifier.segments = 5
    obj.modifiers.new("Weighted normals", "WEIGHTED_NORMAL")
    return finish_object(obj, name, mat)

def cylinder(name, pos, radius, depth, mat, rotation=None):
    bpy.ops.mesh.primitive_cylinder_add(vertices=64, radius=radius, depth=depth, location=pos)
    obj = bpy.context.object
    if rotation:
        obj.rotation_euler = rotation
    modifier = obj.modifiers.new("Rounded rim", "BEVEL")
    modifier.width = 0.045
    modifier.segments = 3
    obj.modifiers.new("Weighted normals", "WEIGHTED_NORMAL")
    return finish_object(obj, name, mat)

def ring(name, pos, radius, thickness, mat, rotation=None):
    bpy.ops.mesh.primitive_torus_add(major_segments=64, minor_segments=16,
        major_radius=radius, minor_radius=thickness, location=pos)
    obj = bpy.context.object
    if rotation:
        obj.rotation_euler = rotation
    return finish_object(obj, name, mat)

def tube(name, points, radius, mat, cyclic=False):
    curve = bpy.data.curves.new(name, "CURVE")
    curve.dimensions = "3D"
    curve.resolution_u = 16
    curve.bevel_depth = radius
    curve.bevel_resolution = 4
    spline = curve.splines.new("BEZIER")
    spline.bezier_points.add(len(points) - 1)
    for point, coords in zip(spline.bezier_points, points):
        point.co = coords
        point.handle_left_type = "AUTO"
        point.handle_right_type = "AUTO"
    spline.use_cyclic_u = cyclic
    obj = bpy.data.objects.new(name, curve)
    current.objects.link(obj)
    curve.materials.append(M[mat])
    return obj

def mesh(name, vertices, faces, mat):
    data = bpy.data.meshes.new(name)
    data.from_pydata(vertices, [], faces)
    data.update()
    obj = bpy.data.objects.new(name, data)
    current.objects.link(obj)
    data.materials.append(M[mat])
    bevel = obj.modifiers.new("Soft corners", "BEVEL")
    bevel.width = 0.035
    bevel.segments = 3
    obj.modifiers.new("Weighted normals", "WEIGHTED_NORMAL")
    return obj

def bowl(mat):
    profile = [(0, .12), (.38, .12), (.68, .23), (.9, .48), (1, .76),
               (.96, .82), (.89, .77), (.8, .53), (.6, .36), (0, .32)]
    verts = []
    segments = 80
    for radius, height in profile:
        for i in range(segments):
            a = i * 2 * math.pi / segments
            verts.append((radius * math.cos(a), radius * math.sin(a), height))
    faces = []
    for row in range(len(profile) - 1):
        for i in range(segments):
            a = row * segments + i
            b = row * segments + (i + 1) % segments
            faces.append((a, b, b + segments, a + segments))
    obj = mesh("Hand-thrown bowl", verts, faces, mat)
    for poly in obj.data.polygons:
        poly.use_smooth = True
    ring("Bowl rim", (0, 0, .78), .97, .045, mat)

start("01 - Shopping")
box("Burgundy shopping bag", (0, 0, .85), (1.4, .7, 1.5), "red", .16)
box("Inset bag opening", (0, 0, 1.58), (1.15, .44, .06), "dark", .04)
for y in (-.22, .22):
    tube("Brass rope handle", [(-.42, y, 1.5), (-.38, y, 2.02),
        (0, y, 2.22), (.38, y, 2.02), (.42, y, 1.5)], .055, "gold")
sphere("Small bag emblem", (0, -.36, .88), (.12, .035, .12), "gold")

start("02 - Exploring")
cylinder("Compass brass case", (0, 0, .36), .97, .35, "metal")
cylinder("Compass porcelain face", (0, 0, .56), .83, .06, "cream")
ring("Compass outer bezel", (0, 0, .58), .89, .06, "green")
for i in range(12):
    a = i * math.pi / 6
    box("Compass tick", (.7 * math.cos(a), .7 * math.sin(a), .615),
        (.05, .14 if i % 3 == 0 else .08, .025), "red" if i % 3 == 0 else "metal",
        .01, (0, 0, a - math.pi / 2))
mesh("North needle", [(-.14, 0, .68), (0, .66, .73), (.14, 0, .68)], [(0, 1, 2)], "cherry")
mesh("South needle", [(-.14, 0, .68), (0, -.66, .73), (.14, 0, .68)], [(0, 1, 2)], "green")
sphere("Compass pin", (0, 0, .72), (.1, .1, .08), "metal")
ring("Compass loop", (0, 1.11, .38), .22, .055, "metal")

start("03 - Pasta")
bowl("red")
for i in range(15):
    a = i * .67
    pts = [(math.cos(a+t*.33) * (.37 + .014*t), math.sin(a+t*.33) * (.37 + .014*t),
            .78 + .018*math.sin(t + i)) for t in range(10)]
    tube("Golden pasta strand", pts, .057, "gold")
for pos in [(-.35, -.38, .88), (.4, .2, .88), (-.15, .4, .9)]:
    sphere("Roasted tomato", pos, (.17, .17, .13), "cherry")
leaf = sphere("Basil leaf", (.27, -.18, 1.01), (.27, .11, .025), "green")
leaf.rotation_euler.z = .5

start("04 - Bread")
sphere("Artisan bread loaf", (0, 0, .66), (1.08, .65, .59), "bread")
for x in (-.52, -.12, .3, .65):
    tube("Loaf scoring", [(x-.16, -.35, 1.06), (x-.05, -.12, 1.22),
        (x+.07, .12, 1.22), (x+.16, .35, 1.06)], .045, "crumb")
box("Fresh bread slice crust", (.65, -.55, .38), (.75, .26, .76), "bread", .22, (0, -.18, -.2))
box("Fresh bread slice crumb", (.65, -.7, .39), (.61, .035, .6), "crumb", .18, (0, -.18, -.2))

start("05 - Fruit")
sphere("Red apple left", (-.3, -.05, .71), (.53, .48, .6), "cherry")
sphere("Red apple right", (.08, -.05, .71), (.5, .48, .59), "cherry")
tube("Apple stalk", [(-.1, 0, 1.2), (-.08, .02, 1.48), (.02, .05, 1.58)], .05, "brown")
leaf = sphere("Apple leaf", (.15, .03, 1.43), (.3, .13, .045), "green")
leaf.rotation_euler = (.2, -.3, .3)
sphere("Golden pear base", (.65, .38, .52), (.44, .4, .48), "gold")
sphere("Golden pear neck", (.65, .38, .9), (.23, .23, .4), "gold")
tube("Pear stalk", [(.65, .38, 1.18), (.69, .4, 1.38)], .035, "brown")

start("06 - Salads")
bowl("cream")
for i in range(13):
    a = i * 2.4
    r = .2 + .055 * (i % 8)
    obj = sphere("Fresh salad leaf", (r*math.cos(a), r*math.sin(a), .76 + .035*(i%3)),
        (.34, .17, .095), "green" if i % 2 else "leaf")
    obj.rotation_euler = (.1*i, .2, a)
for x, y in [(-.35, -.33), (.33, -.2), (.23, .42)]:
    sphere("Cherry tomato", (x, y, .95), (.17, .17, .14), "cherry")
for x, y in [(-.4, .25), (.1, -.52), (.5, .14)]:
    ring("Cucumber ring", (x, y, .94), .135, .045, "green")
    cylinder("Cucumber center", (x, y, .945), .11, .05, "cream")
box("Golden pepper", (-.04, .09, 1.01), (.38, .1, .06), "gold", .035, (.1, .1, .8))

start("07 - Dogs")
sphere("Puppy head", (0, 0, 1), (.7, .54, .69), "cream")
for x in (-.61, .61):
    ear = sphere("Floppy cocoa ear", (x, -.02, .93), (.25, .25, .58), "brown")
    ear.rotation_euler.y = -.22 if x < 0 else .22
for x in (-.24, .24):
    sphere("Puppy eye", (x, -.49, 1.16), (.085, .055, .1), "dark")
    sphere("Eye glint", (x-.018, -.54, 1.2), (.023, .015, .026), "white")
sphere("Soft muzzle", (0, -.48, .85), (.33, .18, .24), "crumb")
sphere("Nose", (0, -.65, .96), (.12, .065, .09), "dark")
sphere("Little tongue", (.03, -.6, .68), (.09, .045, .13), "cherry")
box("Burgundy collar", (0, .01, .42), (.87, .68, .16), "red", .08)
sphere("Collar tag", (0, -.37, .37), (.1, .035, .12), "metal")

start("08 - Photography")
box("Camera body", (0, 0, .78), (1.75, .63, 1.12), "red", .17)
box("Camera top prism", (-.12, .0, 1.4), (.65, .5, .3), "red", .08)
box("Viewfinder", (-.12, -.26, 1.4), (.35, .05, .12), "dark", .025)
rot = (math.pi / 2, 0, 0)
cylinder("Lens barrel", (.1, -.48, .76), .49, .42, "dark", rot)
ring("Lens brass ring", (.1, -.72, .76), .42, .045, "metal", rot)
cylinder("Optical glass", (.1, -.73, .76), .35, .04, "glass", rot)
sphere("Lens reflection", (-.02, -.77, .88), (.09, .015, .14), "white")
cylinder("Shutter dial", (.56, -.02, 1.38), .15, .12, "gold")
box("Camera flash", (-.61, -.33, 1.03), (.26, .035, .14), "cream", .025)

start("09 - Writing")
box("Notebook pages", (0, 0, .31), (1.27, 1.7, .22), "cream", .08)
for z in (.16, .44):
    box("Burgundy notebook cover", (0, 0, z), (1.4, 1.82, .08), "red", .06)
box("Notebook spine", (-.66, 0, .31), (.11, 1.8, .3), "red", .04)
for y in (.42, .21, 0):
    box("Gold embossed line", (.08, y, .49), (.7, .025, .012), "gold", .01)
tube("Pencil shaft", [(.62, -.7, .62), (.62, .6, .62)], .07, "gold")
tube("Pencil graphite", [(.62, -.7, .62), (.62, -.9, .62)], .035, "dark")
sphere("Pencil eraser", (.62, .66, .62), (.075, .13, .075), "red")

start("10 - Drawing and painting")
sphere("Wooden paint palette", (0, 0, .23), (1.04, .73, .16), "crumb")
for x, y, mat in [(-.62, .12, "red"), (-.29, .36, "green"), (.13, .4, "gold"),
                  (.51, .18, "cherry"), (-.55, -.27, "white")]:
    sphere("Glossy paint dab", (x, y, .4), (.16, .13, .06), mat)
tube("Paintbrush handle", [(-.14, -.51, .48), (.68, .17, .55)], .07, "red")
tube("Paintbrush ferrule", [(.68, .17, .55), (.84, .31, .56)], .085, "metal")
brush = sphere("Brush bristles", (.98, .43, .57), (.22, .09, .085), "brown")
brush.rotation_euler.z = .7

start("11 - Building")
box("Foundation block", (0, 0, .27), (1.5, 1.1, .45), "green", .08)
box("House block", (-.17, .05, .88), (.83, .85, .79), "cream", .07)
mesh("Burgundy pitched roof", [(-.72, -.47, 1.23), (.38, -.47, 1.23),
    (-.17, -.47, 1.91), (-.72, .57, 1.23), (.38, .57, 1.23), (-.17, .57, 1.91)],
    [(0, 1, 2), (3, 5, 4), (0, 3, 4, 1), (0, 2, 5, 3), (1, 4, 5, 2)], "red")
box("House door", (-.17, -.39, .7), (.2, .06, .36), "gold", .025)
box("Small building block", (.7, -.24, .72), (.5, .6, .45), "gold", .06)

start("12 - Thinking and logic")
sphere("Idea bulb", (0, 0, 1.27), (.63, .63, .65), "gold")
cylinder("Bulb neck", (0, 0, .69), .33, .45, "gold")
cylinder("Burgundy bulb base", (0, 0, .39), .34, .25, "red")
for z in (.3, .38, .46):
    ring("Base thread", (0, 0, z), .34, .035, "metal")
tube("Idea filament", [(-.2, -.15, .82), (-.25, -.15, 1.25), (0, -.15, 1.12),
    (.25, -.15, 1.25), (.2, -.15, .82)], .03, "cream")
for a in (-.2, .7, 1.6, 2.5):
    tube("Idea ray", [(1.0*math.cos(a), .04, 1.2+.75*math.sin(a)),
        (1.2*math.cos(a), .04, 1.2+.94*math.sin(a))], .045, "cream")

scene = bpy.context.scene
scene.render.engine = "CYCLES"
scene.cycles.device = "CPU"
scene.cycles.samples = 32
scene.cycles.use_denoising = True
scene.render.resolution_x = 480
scene.render.resolution_y = 480
scene.render.resolution_percentage = 100
scene.render.film_transparent = True
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGBA"
scene.world.color = (.35, .35, .35)
scene.view_settings.view_transform = "AgX"

studio = bpy.data.collections.new("Studio - camera and softboxes")
scene.collection.children.link(studio)
def studio_object(obj):
    for collection in list(obj.users_collection):
        collection.objects.unlink(obj)
    studio.objects.link(obj)

def aim(obj, target):
    obj.rotation_euler = (Vector(target) - obj.location).to_track_quat("-Z", "Y").to_euler()

bpy.ops.object.camera_add(location=(4.5, -7, 6))
camera = bpy.context.object
studio_object(camera)
camera.name = "Orthographic product camera"
camera.data.type = "ORTHO"
camera.data.ortho_scale = 2.75
aim(camera, (0, 0, .85))
scene.camera = camera
for name, pos, power, size in [("Key softbox", (-3, -4, 7), 650, 4),
    ("Fill softbox", (4, -1, 4), 420, 3), ("Rim softbox", (0, 4, 5), 700, 3)]:
    bpy.ops.object.light_add(type="AREA", location=pos)
    light = bpy.context.object
    studio_object(light)
    light.name = name
    light.data.energy = power
    light.data.shape = "DISK"
    light.data.size = size
    aim(light, (0, 0, .7))

names = ["shopping", "exploring", "pasta", "bread", "fruit", "salad",
         "dogs", "photography", "writing", "painting", "building", "thinking"]
for index, collection in enumerate(collections):
    for group in collections:
        group.hide_render = group != collection
    scene.render.filepath = os.path.join(OUTPUT, names[index] + ".png")
    bpy.ops.render.render(write_still=True)
    print("ICON COMPLETE: " + names[index], flush=True)

# Lay out the editable source as a contact sheet when opened in Blender.
for index, collection in enumerate(collections):
    collection.hide_render = False
    x = ((index % 4) - 1.5) * 3.6
    y = (1 - index // 4) * 3.8
    for obj in collection.objects:
        obj.location.x += x
        obj.location.y += y
camera.location = (3, -13, 20)
camera.data.ortho_scale = 17
aim(camera, (0, 0, .6))
scene.render.resolution_x = 1200
scene.render.resolution_y = 900
scene.cycles.samples = 16
scene.render.filepath = os.path.join(SOURCE, "icon-contact-sheet.png")
scene["About"] = "Twelve original, editable interest icons for Zia Louise Mariano."
scene["Palette"] = "Burgundy, olive green, golden yellow, warm cream."
scene["Rerender"] = "Run scripts/build-interest-icons.py to regenerate individual transparent PNGs."
bpy.context.preferences.filepaths.save_version = 0
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(SOURCE, "zia-interest-icons.blend"), compress=True)
bpy.ops.render.render(write_still=True)
print("BLENDER SOURCE AND ICONS SAVED", flush=True)
