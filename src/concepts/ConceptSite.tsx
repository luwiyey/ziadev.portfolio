import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  X,
} from "lucide-react";
import "./concepts.css";
import { Clearline, Fieldwork, Halfcourt, Morrow, Ridgeline } from "./NewConcepts";

const image = (name: string) => "/concepts/" + name;
const photos = [
  {
    src: "coast.webp",
    title: "Where the land exhales",
    group: "Nature",
    detail: "Coast / a study in blue",
    credit: "Daniel Radford / Unsplash",
  },
  {
    src: "architecture.webp",
    title: "A quiet kind of geometry",
    group: "Architecture",
    detail: "Form / afternoon light",
    credit: "Unsplash reference photograph",
  },
  {
    src: "rock.webp",
    title: "Nothing to hurry for",
    group: "Nature",
    detail: "Distance / open water",
    credit: "Timo Volz / Unsplash",
  },
  {
    src: "concrete.webp",
    title: "The spaces between",
    group: "Architecture",
    detail: "Structure / repetition",
    credit: "Chris Johnson / Unsplash",
  },
];

function Modal({
  title,
  children,
  close,
}: {
  title: string;
  children: ReactNode;
  close: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.showModal();
    return () => {
      ref.current?.close();
      document.body.style.overflow = previous;
    };
  }, []);
  return (
    <dialog
      className="concept-dialog"
      ref={ref}
      onCancel={close}
      aria-label={title}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="concept-dialog-header">
        <h2>{title}</h2>
        <button onClick={close} aria-label="Close dialog">
          <X />
        </button>
      </div>
      {children}
    </dialog>
  );
}

function Footer({
  name,
  credits = false,
}: {
  name: string;
  credits?: boolean;
}) {
  return (
    <footer className="concept-footer">
      <strong>{name}</strong>
      <p>
        Independent website concept by Zia Mariano. Fictional business; no
        orders or bookings are sent.
        {credits &&
          " Reference photography: Unsplash, not work photographed by Zia."}
      </p>
      <a href="/#work">
        Back to the portfolio <ArrowUpRight size={16} />
      </a>
    </footer>
  );
}

function Fold() {
  const [category, setCategory] = useState("All");
  const goods = [
    {
      name: "The daily sourdough",
      category: "Bread",
      price: "280",
      note: "Crackly crust. Soft heart.",
      art: "bread",
    },
    {
      name: "Butter, folded slowly",
      category: "Pastry",
      price: "120",
      note: "Our all-butter croissant.",
      art: "croissant",
    },
    {
      name: "Sunday cinnamon knot",
      category: "Pastry",
      price: "135",
      note: "A little messy. Very worth it.",
      art: "knot",
    },
  ];
  return (
    <div className="fold-site">
      <header className="fold-header">
        <a href="#fold-home" className="fold-logo">
          fold<span>BAKERY & EVERYDAY RITUALS</span>
        </a>
        <nav aria-label="Bakery navigation">
          <a href="#fold-menu">The bake</a>
          <a href="#fold-story">Our rhythm</a>
          <a href="#fold-visit">
            Come by <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <main id="fold-home">
        <section className="fold-hero">
          <div className="fold-hero-copy">
            <p className="c-kicker">FLOUR. WATER. A LITTLE PATIENCE.</p>
            <h1>
              Good things
              <br />
              take <em>their time.</em>
            </h1>
            <p>
              Slow-fermented bread. Warm-from-the-oven pastries. A small reason
              to make your morning a little longer.
            </p>
            <a className="fold-button" href="#fold-menu">
              Meet your morning <ArrowDown size={18} />
            </a>
            <span className="fold-edition">
              A NEIGHBORHOOD BAKERY / CONCEPT No. 01
            </span>
          </div>
          <div className="fold-bread-scene">
            <span className="fold-stamp">
              MADE
              <br />
              SLOWLY
              <br />
              <small>ENJOYED DAILY</small>
            </span>
            <img
              src={image("bread.svg")}
              alt="Original illustration of a golden sourdough loaf"
            />
            <div className="fold-scene-note">
              A good loaf has a story.
              <br />
              Ours starts before sunrise.
            </div>
          </div>
        </section>
        <div className="fold-ribbon" aria-hidden="true">
          A LITTLE FLOUR. A LOT OF FEELING. <span>*</span> FRESH BAKES. SLOW
          MORNINGS. <span>*</span> A LITTLE FLOUR. A LOT OF FEELING.
        </div>
        <section className="fold-menu c-shell" id="fold-menu">
          <div className="fold-section-heading">
            <p className="c-kicker">ON THE COUNTER</p>
            <h2>
              Something for
              <br />
              <em>your kind of morning.</em>
            </h2>
            <p>
              Small batches, familiar favorites.
              <br />
              Illustrative menu / prices in PHP.
            </p>
          </div>
          <div
            className="concept-filters"
            role="group"
            aria-label="Filter bakery menu"
          >
            {["All", "Bread", "Pastry"].map((item) => (
              <button
                key={item}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="fold-goods" aria-live="polite">
            {goods
              .filter(
                (good) => category === "All" || good.category === category,
              )
              .map((good) => (
                <article key={good.name}>
                  <div>
                    <img
                      src={image(good.art + ".svg")}
                      alt={good.name}
                      loading="lazy"
                    />
                  </div>
                  <p className="c-kicker">{good.category}</p>
                  <h3>
                    {good.name}
                    <span>PHP {good.price}</span>
                  </h3>
                  <p>{good.note}</p>
                </article>
              ))}
          </div>
        </section>
        <section className="fold-story" id="fold-story">
          <span className="fold-story-number">48h</span>
          <div>
            <p className="c-kicker">NOT A SHORTCUT IN SIGHT</p>
            <h2>
              Time is our
              <br />
              <em>favorite ingredient.</em>
            </h2>
            <p>
              A slower rise brings a deeper flavor. In this little bakery
              concept, the process gets as much care as the finished loaf.
              Simple ingredients, thoughtfully put together.
            </p>
          </div>
        </section>
        <section className="fold-visit c-shell" id="fold-visit">
          <p className="c-kicker">SAVE A LITTLE ROOM</p>
          <h2>
            Your morning
            <br />
            looks better <em>from here.</em>
          </h2>
          <a href="#fold-menu">
            Take another look at the bake <ArrowUpRight />
          </a>
          <p>
            Independent bakery concept. Visit details and ordering would be
            connected for a real business.
          </p>
        </section>
      </main>
      <Footer name="fold / a slower start" />
    </div>
  );
}

const buildings = [
  {
    title: "Courtyard house",
    type: "Residential",
    image: "architecture.webp",
    description:
      "A conceptual residence organized around light, shade, and a central outdoor room.",
  },
  {
    title: "The civic rooms",
    type: "Commercial",
    image: "concrete.webp",
    description:
      "A conceptual shared workspace with a rhythmic facade and generous communal space.",
  },
];
function Northline() {
  const [filter, setFilter] = useState("All projects");
  const [selected, setSelected] = useState<(typeof buildings)[number] | null>(
    null,
  );
  return (
    <div className="north-site">
      <header className="north-header">
        <a className="north-logo" href="#north-home">
          N/{" "}
          <span>
            NORTHLINE
            <br />
            ARCHITECTURE
          </span>
        </a>
        <nav aria-label="Architecture navigation">
          <a href="#north-work">Selected spaces</a>
          <a href="#north-approach">Approach</a>
          <a href="#north-contact">
            Start a conversation <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>
      <main id="north-home">
        <section className="north-hero">
          <div className="north-hero-top">
            <p className="c-kicker">ARCHITECTURE / INTERIORS / PLACE</p>
            <span>INDEPENDENT STUDIO CONCEPT</span>
          </div>
          <h1>
            Less noise.
            <br />
            <em>More belonging.</em>
          </h1>
          <div className="north-hero-image">
            <img
              src={image("architecture.webp")}
              alt="Reference photograph of geometric white architecture"
            />
            <div className="north-caption">
              <span>01 / A STUDY IN LIGHT</span>
              <a href="#north-work" aria-label="Explore selected spaces">
                <ArrowDown />
              </a>
            </div>
          </div>
          <div className="north-under">
            <p>
              Spaces that leave room
              <br />
              for the way you live.
            </p>
            <p>
              Thoughtful architecture starts with listening. We explore the
              relationship between people, materials, and the places they call
              their own.
            </p>
          </div>
        </section>
        <section className="north-work" id="north-work">
          <div className="north-section-title">
            <p className="c-kicker">01 / SELECTED SPACES</p>
            <h2>
              A considered
              <br />
              <em>collection.</em>
            </h2>
          </div>
          <div
            className="concept-filters"
            role="group"
            aria-label="Filter architecture projects"
          >
            {["All projects", "Residential", "Commercial"].map((item) => (
              <button
                key={item}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="north-projects" aria-live="polite">
            {buildings
              .filter(
                (item) => filter === "All projects" || item.type === filter,
              )
              .map((building, index) => (
                <button
                  key={building.title}
                  onClick={() => setSelected(building)}
                >
                  <img
                    src={image(building.image)}
                    alt={building.title + " reference image"}
                    loading="lazy"
                  />
                  <span>
                    <small>
                      0{index + 1} / {building.type}
                    </small>
                    <strong>{building.title}</strong>
                    <ArrowUpRight />
                  </span>
                </button>
              ))}
          </div>
        </section>
        <section className="north-approach" id="north-approach">
          <p className="c-kicker">02 / HOW WE THINK</p>
          <h2>
            Built around life.
            <br />
            Not the other way around.
          </h2>
          <div>
            {[
              "Listen before drawing.",
              "Make room for light.",
              "Choose materials honestly.",
            ].map((item, i) => (
              <p key={item}>
                <span>0{i + 1}</span>
                {item}
              </p>
            ))}
          </div>
        </section>
        <section className="north-contact" id="north-contact">
          <p className="c-kicker">03 / THE NEXT CHAPTER</p>
          <h2>
            Every place begins
            <br />
            with a <em>conversation.</em>
          </h2>
          <a href="mailto:luwiyeyz@gmail.com?subject=Architecture%20website%20concept%20enquiry">
            Ask Zia about this website concept <ArrowUpRight />
          </a>
        </section>
      </main>
      <Footer name="N/ NORTHLINE" credits />
      {selected && (
        <Modal title={selected.title} close={() => setSelected(null)}>
          <img
            className="concept-modal-image"
            src={image(selected.image)}
            alt={selected.title + " reference"}
          />
          <div className="concept-modal-copy">
            <p>{selected.description}</p>
            <p>
              Website concept only. Reference architecture photography from
              Unsplash; this is not a claim to have designed the building.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

function GoodDog() {
  const [size, setSize] = useState("Small");
  const [service, setService] = useState("Bath & brush");
  const [preview, setPreview] = useState(false);
  const price =
    ({ Small: 650, Medium: 850, Large: 1100 }[size] ?? 650) +
    (service === "The full fluff" ? 450 : 0);
  return (
    <div className="dog-site">
      <header className="dog-header">
        <a className="dog-logo" href="#dog-home">
          good dog<span>GROOMING CLUB</span>
        </a>
        <nav aria-label="Pet studio navigation">
          <a href="#dog-care">The good stuff</a>
          <a href="#dog-book">Find your groom</a>
        </nav>
        <a className="dog-pill" href="#dog-book">
          Time for a glow-up <ArrowUpRight size={17} />
        </a>
      </header>
      <main id="dog-home">
        <section className="dog-hero">
          <div>
            <p className="c-kicker">BIG FEELINGS. LITTLE PAWS. FRESH STARTS.</p>
            <h1>
              Good hair.
              <br />
              Happy tails.
              <br />
              <span>Very good dogs.</span>
            </h1>
            <p>
              A little less tangly. A lot more tail-waggy. Thoughtful grooming
              for your favorite slightly muddy person.
            </p>
            <a className="dog-pill" href="#dog-book">
              Let's get fluffy <ArrowDown size={18} />
            </a>
          </div>
          <div className="dog-portrait">
            <div className="dog-portrait-circle" />
            <img
              src={image("dog.svg")}
              alt="Original illustration of a friendly golden dog"
            />
            <span className="dog-star">
              100%
              <br />
              GOOD DOG
              <br />
              ENERGY
            </span>
            <span className="dog-portrait-caption">
              YES, EVEN THE WIGGLY ONES.
            </span>
          </div>
        </section>
        <section className="dog-care" id="dog-care">
          <div>
            <p className="c-kicker">CARE, NOT A CONVEYOR BELT.</p>
            <h2>
              Their pace.
              <br />
              <em>Our kind of care.</em>
            </h2>
          </div>
          <article>
            <span>01 / GENTLE FROM HELLO</span>
            <h3>Sniffs before suds.</h3>
            <p>
              A calm introduction makes a world of difference. Our concept puts
              comfort before the clippers.
            </p>
          </article>
          <article>
            <span>02 / EVERY COAT IS DIFFERENT</span>
            <h3>No one-size-fits-fluff.</h3>
            <p>
              Choose a service that fits your dog's size and coat. Clear
              choices, without the guesswork.
            </p>
          </article>
        </section>
        <section className="dog-book" id="dog-book">
          <div>
            <p className="c-kicker">LET'S TALK FLUFF</p>
            <h2>
              A fresh look.
              <br />
              <em>No surprises.</em>
            </h2>
            <p>
              Try the interactive service estimate.
              <br />
              Illustrative prices in PHP; no booking is sent.
            </p>
          </div>
          <div className="dog-estimator">
            <fieldset>
              <legend>01 / Your dog's size</legend>
              <div>
                {["Small", "Medium", "Large"].map((item) => (
                  <button
                    key={item}
                    aria-pressed={size === item}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>02 / A little or a lot of fluff?</legend>
              <div>
                {["Bath & brush", "The full fluff"].map((item) => (
                  <button
                    key={item}
                    aria-pressed={service === item}
                    onClick={() => setService(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="dog-total" aria-live="polite">
              <span>Your illustrative estimate</span>
              <strong>PHP {price.toLocaleString()}</strong>
            </div>
            <button className="dog-pill" onClick={() => setPreview(true)}>
              Preview my visit <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>
      <Footer name="good dog / good company" />
      {preview && (
        <Modal title="A very good choice." close={() => setPreview(false)}>
          <div className="concept-modal-copy">
            <p>
              {size} dog / {service}
            </p>
            <strong className="demo-total">PHP {price.toLocaleString()}</strong>
            <p>
              This is a booking-flow preview. Nothing has been booked, and no
              personal information is collected. A real appointment system would
              confirm availability next.
            </p>
            <button className="dog-pill" onClick={() => setPreview(false)}>
              Back to the good stuff <Check size={18} />
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Still() {
  const [filter, setFilter] = useState("All frames");
  const [selected, setSelected] = useState<(typeof photos)[number] | null>(
    null,
  );
  return (
    <div className="still-site">
      <header className="still-header">
        <a className="still-logo" href="#still-home">
          still<span>PHOTOGRAPHY & OBSERVATION</span>
        </a>
        <nav aria-label="Photography navigation">
          <a href="#still-work">Selected frames</a>
          <a href="#still-about">Behind the lens</a>
          <a href="#still-contact">
            Inquiries <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>
      <main id="still-home">
        <section className="still-hero">
          <div className="still-title">
            <p className="c-kicker">AN EXERCISE IN PAYING ATTENTION</p>
            <h1>
              The ordinary,
              <br />
              <em>seen differently.</em>
            </h1>
            <span>
              SCROLL TO LOOK A LITTLE CLOSER <ArrowDown size={16} />
            </span>
          </div>
          <figure>
            <img
              src={image("coast.webp")}
              alt="Turquoise water beneath a green coastal mountain, by Daniel Radford"
            />
            <figcaption>
              <span>01 / SOMEWHERE QUIET</span>
              <span>REFERENCE IMAGE / UNSPLASH</span>
            </figcaption>
          </figure>
          <div className="still-side-note">LIGHT / PLACE / FEELING</div>
        </section>
        <section className="still-work" id="still-work">
          <div className="still-work-top">
            <h2>
              Notes from
              <br />
              <em>the outside.</em>
            </h2>
            <div
              className="concept-filters"
              role="group"
              aria-label="Filter photo collections"
            >
              {["All frames", "Nature", "Architecture"].map((item) => (
                <button
                  key={item}
                  aria-pressed={filter === item}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="still-grid" aria-live="polite">
            {photos
              .filter(
                (photo) => filter === "All frames" || photo.group === filter,
              )
              .map((photo, index) => (
                <button key={photo.title} onClick={() => setSelected(photo)}>
                  <div>
                    <img
                      src={image(photo.src)}
                      alt={photo.title + " / " + photo.credit}
                      loading="lazy"
                    />
                    <span>
                      View frame <Plus size={18} />
                    </span>
                  </div>
                  <p>
                    <span>0{index + 1}</span>
                    {photo.title}
                    <ArrowUpRight size={17} />
                  </p>
                </button>
              ))}
          </div>
        </section>
        <section className="still-about" id="still-about">
          <p className="c-kicker">BEHIND THIS CONCEPT</p>
          <h2>
            Not everything
            <br />
            needs to be <em>loud.</em>
          </h2>
          <p>
            A photography website should make room for the work. This
            independent concept explores pacing, negative space, and a simple
            way to browse a collection. Demo photographs are credited reference
            images, not Zia's own photography.
          </p>
        </section>
        <section className="still-contact" id="still-contact">
          <p className="c-kicker">A NOTE, A QUESTION, AN IDEA.</p>
          <h2>
            Let's see
            <br />
            <em>what unfolds.</em>
          </h2>
          <a href="mailto:luwiyeyz@gmail.com?subject=Photography%20website%20concept%20enquiry">
            Ask Zia about this website <ArrowUpRight size={21} />
          </a>
        </section>
      </main>
      <Footer name="still / an ongoing observation" credits />
      {selected && (
        <Modal title={selected.title} close={() => setSelected(null)}>
          <img
            className="concept-modal-image"
            src={image(selected.src)}
            alt={selected.title}
          />
          <div className="concept-modal-copy">
            <p>{selected.detail}</p>
            <small>
              Reference photograph: {selected.credit}. Demo imagery, not a
              photograph by Zia.
            </small>
          </div>
        </Modal>
      )}
    </div>
  );
}

const products = [
  {
    id: "vase",
    name: "The everyday vessel",
    type: "Ceramics",
    material: "Terracotta / matte",
    price: 1450,
    color: "#b46a46",
    art: "vase",
  },
  {
    id: "bowl",
    name: "Slow Sunday bowl",
    type: "Ceramics",
    material: "Olive / glazed",
    price: 850,
    color: "#79845c",
    art: "bowl",
  },
  {
    id: "lamp",
    name: "A softer light",
    type: "Lighting",
    material: "Sand / sculptural",
    price: 3200,
    color: "#d2bb94",
    art: "lamp",
  },
];
function Forma() {
  const [filter, setFilter] = useState("All objects");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = products.reduce(
    (sum, product) => sum + product.price * (cart[product.id] ?? 0),
    0,
  );
  const update = (id: string, delta: number) => {
    setCart((previous) => ({
      ...previous,
      [id]: Math.max(0, (previous[id] ?? 0) + delta),
    }));
    setCheckout(false);
  };
  return (
    <div className="forma-site">
      <div className="forma-announcement">
        FEWER THINGS. BETTER THINGS. / A STOREFRONT CONCEPT
      </div>
      <header className="forma-header">
        <a className="forma-logo" href="#forma-home">
          forma<span>OBJECTS FOR EVERYDAY LIVING</span>
        </a>
        <nav aria-label="Store navigation">
          <a href="#forma-shop">The collection</a>
          <a href="#forma-story">Our point of view</a>
        </nav>
        <button
          className="forma-cart-button"
          onClick={() => {
            setOpen(true);
            setCheckout(false);
          }}
          aria-label={"Open demo bag, " + count + " items"}
        >
          <ShoppingBag size={19} /> Bag ({count})
        </button>
      </header>
      <main id="forma-home">
        <section className="forma-hero">
          <div>
            <p className="c-kicker">THE EVERYDAY, A LITTLE MORE CONSIDERED.</p>
            <h1>
              Objects
              <br />
              with <em>feeling.</em>
            </h1>
            <p>
              Small, useful, quietly beautiful. A collection of things to make a
              house feel a little more like you.
            </p>
            <a className="forma-link" href="#forma-shop">
              Discover the collection <ArrowRight size={20} />
            </a>
          </div>
          <div className="forma-hero-art">
            <img
              className="forma-vase"
              src={image("vase.svg")}
              alt="Original terracotta vessel illustration"
            />
            <img
              className="forma-bowl"
              src={image("bowl.svg")}
              alt="Original olive ceramic bowl illustration"
            />
            <span>VOLUME 01 / THE EVERYDAY EDIT</span>
          </div>
        </section>
        <section className="forma-shop" id="forma-shop">
          <div className="forma-shop-top">
            <h2>
              A few good <em>things.</em>
            </h2>
            <span>THOUGHTFULLY CHOSEN / CONCEPT COLLECTION</span>
          </div>
          <div
            className="concept-filters"
            role="group"
            aria-label="Filter store products"
          >
            {["All objects", "Ceramics", "Lighting"].map((item) => (
              <button
                key={item}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="forma-products" aria-live="polite">
            {products
              .filter(
                (product) =>
                  filter === "All objects" || product.type === filter,
              )
              .map((product) => (
                <article key={product.id}>
                  <div className="forma-product-art">
                    <img
                      src={image(product.art + ".svg")}
                      alt={product.name}
                      loading="lazy"
                    />
                    <button
                      onClick={() => update(product.id, 1)}
                      aria-label={"Add " + product.name + " to demo bag"}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="forma-product-caption">
                    <h3>{product.name}</h3>
                    <span>PHP {product.price.toLocaleString()}</span>
                  </div>
                  <p>
                    <span style={{ background: product.color }} />
                    {product.material}
                  </p>
                  <button
                    className="forma-add"
                    onClick={() => update(product.id, 1)}
                  >
                    {cart[product.id]
                      ? "In your bag (" + cart[product.id] + ") / add another"
                      : "Add to demo bag"}{" "}
                    <Plus size={14} />
                  </button>
                </article>
              ))}
          </div>
          <p className="forma-cart-status" role="status">
            {count
              ? count +
                (count === 1 ? " object" : " objects") +
                " in your demo bag."
              : "Explore the collection. Nothing is charged or ordered."}
          </p>
        </section>
        <section className="forma-story" id="forma-story">
          <div className="forma-story-art">
            <img
              src={image("lamp.svg")}
              alt="Sculptural table lamp illustration"
            />
          </div>
          <div>
            <p className="c-kicker">A HOME IS MADE OF LITTLE THINGS.</p>
            <h2>
              Not more.
              <br />
              <em>More meaningful.</em>
            </h2>
            <p>
              The cup you reach for. The light you leave on. We imagined Forma
              around the objects that quietly earn their place in everyday life.
            </p>
            <p className="forma-theme-note">
              Development note: this frontend concept includes editable Shopify
              Liquid theme source. It is not currently installed on a Shopify
              store. The demo bag is browser-only and resets on refresh.
            </p>
          </div>
        </section>
      </main>
      <Footer name="forma / considered living" />
      {open && (
        <Modal
          title={"Your demo bag (" + count + ")"}
          close={() => setOpen(false)}
        >
          <div className="concept-modal-copy">
            {!count ? (
              <p>Your bag is waiting for a good thing.</p>
            ) : (
              <>
                {products
                  .filter((product) => cart[product.id])
                  .map((product) => (
                    <div className="forma-cart-row" key={product.id}>
                      <img src={image(product.art + ".svg")} alt="" />
                      <div>
                        <strong>{product.name}</strong>
                        <p>
                          PHP{" "}
                          {(product.price * cart[product.id]).toLocaleString()}
                        </p>
                        <div className="forma-quantity">
                          <button
                            onClick={() => update(product.id, -1)}
                            aria-label={"Remove one " + product.name}
                          >
                            <Minus size={15} />
                          </button>
                          <span>{cart[product.id]}</span>
                          <button
                            onClick={() => update(product.id, 1)}
                            aria-label={"Add one " + product.name}
                          >
                            <Plus size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                <div className="forma-subtotal">
                  <span>Illustrative subtotal</span>
                  <strong>PHP {total.toLocaleString()}</strong>
                </div>
                <button
                  className="forma-checkout"
                  onClick={() => setCheckout(true)}
                >
                  Preview checkout <ArrowRight size={18} />
                </button>
                {checkout && (
                  <p role="status" className="forma-checkout-note">
                    Demo complete. A real store would hand off to Shopify's
                    secure checkout. No purchase was made and no payment
                    information is collected.
                  </p>
                )}
              </>
            )}
            <p className="forma-theme-note">
              Portfolio demo only. No real products, payments, or shipping.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

const concepts: Record<string, { name: string; component: () => ReactNode }> = {
  fold: { name: "Fold Bakery", component: Fold },
  northline: { name: "Northline Architecture", component: Northline },
  "good-dog": { name: "Good Dog Grooming", component: GoodDog },
  still: { name: "Still Photography", component: Still },
  forma: { name: "Forma Objects", component: Forma },
  fieldwork: { name: "Fieldwork Market", component: Fieldwork },
  morrow: { name: "Morrow Dog Food", component: Morrow },
  halfcourt: { name: "Halfcourt Sports", component: Halfcourt },
  ridgeline: { name: "Ridgeline Outdoors", component: Ridgeline },
  clearline: { name: "Clearline Automation", component: Clearline },
};
export default function ConceptSite({ slug }: { slug: string }) {
  const concept = concepts[slug];
  const embedded =
    new URLSearchParams(window.location.search).get("embed") === "1";
  useEffect(() => {
    document.title =
      (concept?.name ?? "Concept not found") +
      " | Website concept by Zia Mariano";
  }, [concept]);
  useEffect(() => {
    if (!embedded) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !document.querySelector("dialog[open]"))
        window.parent.postMessage(
          { type: "zia:close-demo" },
          window.location.origin,
        );
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [embedded]);
  const Page = concept?.component;
  return (
    <div
      className={
        "concept-site concept-" + slug + (embedded ? " is-embedded" : "")
      }
    >
      <a className="concept-back" href="/#work">
        <ArrowLeft size={13} /> Zia Mariano / independent website concept{" "}
        <span>
          Back to portfolio <ArrowUpRight size={13} />
        </span>
      </a>
      {Page ? (
        <Page />
      ) : (
        <main className="concept-not-found">
          <h1>This concept isn't here.</h1>
          <a href="/#work">
            Explore the portfolio instead <ArrowRight />
          </a>
        </main>
      )}
    </div>
  );
}
