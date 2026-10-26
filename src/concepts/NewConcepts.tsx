import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Minus,
  Plus,
  Search,
  ShoppingBasket,
  X,
} from "lucide-react";
import "./new-concepts.css";

type Product = {
  id: string;
  name: string;
  price: number;
  unit: string;
  group: string;
  image?: string;
};
type CartLine = Product & { quantity: number };
const php = (value: number) =>
  "PHP " + value.toLocaleString("en-PH", { maximumFractionDigits: 2 });
function useBag() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  return {
    lines,
    open,
    notice,
    setOpen,
    count: lines.reduce((sum, item) => sum + item.quantity, 0),
    add(product: Product) {
      setLines((items) =>
        items.some((item) => item.id === product.id)
          ? items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : [...items, { ...product, quantity: 1 }],
      );
      setNotice(product.name + " added to your sample bag.");
    },
    update(id: string, delta: number) {
      setLines((items) =>
        items
          .map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + delta }
              : item,
          )
          .filter((item) => item.quantity > 0),
      );
    },
  };
}
function Bag({
  bag,
  fee = 0,
}: {
  bag: ReturnType<typeof useBag>;
  fee?: number;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [checkout, setCheckout] = useState(false);
  useEffect(() => {
    const focus = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = ref.current;
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      focus?.focus();
    };
  }, []);
  const subtotal = bag.lines.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );
  return (
    <dialog
      className="sample-bag"
      ref={ref}
      aria-label="Your sample bag"
      onCancel={() => bag.setOpen(false)}
      onClick={(event) => {
        if (event.target === event.currentTarget) bag.setOpen(false);
      }}
    >
      <div className="sample-bag-top">
        <h2>Your sample bag</h2>
        <button onClick={() => bag.setOpen(false)} aria-label="Close bag">
          <X />
        </button>
      </div>
      {!bag.lines.length ? (
        <p>Your bag is empty. Find something you like first.</p>
      ) : (
        <>
          {bag.lines.map((item) => (
            <div className="sample-bag-line" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <p>
                  {php(item.price)} / {item.unit}
                </p>
                <div className="sample-quantity">
                  <button
                    aria-label={"Remove one " + item.name}
                    onClick={() => bag.update(item.id, -1)}
                  >
                    <Minus size={15} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    aria-label={"Add one " + item.name}
                    onClick={() => bag.update(item.id, 1)}
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>
              <strong>{php(item.quantity * item.price)}</strong>
            </div>
          ))}
          <div className="sample-bag-total">
            <p>
              Subtotal <strong>{php(subtotal)}</strong>
            </p>
            {fee > 0 && (
              <p>
                Illustrative delivery <strong>{php(fee)}</strong>
              </p>
            )}
            <p>
              Total <strong>{php(subtotal + fee)}</strong>
            </p>
          </div>
          <button className="sample-checkout" onClick={() => setCheckout(true)}>
            Preview order <ArrowRight size={17} />
          </button>
          {checkout && (
            <p role="status" className="sample-confirmation">
              This is the end of the demo. No order was placed, no payment was
              taken, and no details are collected.
            </p>
          )}
        </>
      )}
      <p className="sample-small">
        Independent portfolio concept. Products, prices, and business details
        are illustrative.
      </p>
    </dialog>
  );
}
function Note({ photos = true }: { photos?: boolean }) {
  return (
    <footer className="sample-footer">
      <p>
        Original website concept by Zia Mariano. Fictional business; not
        commissioned client work.
        {photos &&
          " Reference photography: Unsplash. Product packaging and interface illustrations are original concept artwork."}
      </p>
      <a href="/#work">
        Return to portfolio <ArrowUpRight size={15} />
      </a>
    </footer>
  );
}

const groceries: Product[] = [
  {
    id: "tomato",
    name: "Market tomatoes",
    price: 85,
    unit: "500 g",
    group: "Produce",
    image: "tomatoes",
  },
  {
    id: "greens",
    name: "Salad greens",
    price: 120,
    unit: "250 g",
    group: "Produce",
    image: "greens",
  },
  {
    id: "orange",
    name: "Sweet oranges",
    price: 160,
    unit: "1 kg",
    group: "Fruit",
    image: "oranges",
  },
  {
    id: "bread",
    name: "Country sourdough",
    price: 280,
    unit: "loaf",
    group: "Bakery",
    image: "bread.svg",
  },
];
export function Fieldwork() {
  const [filter, setFilter] = useState("Everything");
  const [query, setQuery] = useState("");
  const [delivery, setDelivery] = useState("Pickup");
  const bag = useBag();
  const products = groceries.filter(
    (product) =>
      (filter === "Everything" || product.group === filter) &&
      product.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="fieldwork sample-store">
      <div className="market-utility">
        <span>YOUR NEIGHBORHOOD, WELL STOCKED.</span>
        <label>
          Shopping for
          <select
            value={delivery}
            onChange={(event) => setDelivery(event.target.value)}
          >
            <option>Pickup</option>
            <option>Delivery</option>
          </select>
        </label>
      </div>
      <header className="market-header">
        <a className="market-logo" href="#market-home">
          fieldwork<span>THE EVERYDAY MARKET</span>
        </a>
        <nav aria-label="Market navigation">
          <a href="#market-shop">Shop groceries</a>
          <a href="#market-guide">How it works</a>
        </nav>
        <button onClick={() => bag.setOpen(true)} aria-label={"Basket (" + bag.count + ")"}>
          <ShoppingBasket size={20} />
          <span data-count={bag.count}>Basket ({bag.count})</span>
        </button>
      </header>
      <main id="market-home">
        <section className="market-hero">
          <div>
            <p>THE WEEKLY SHOP, SORTED.</p>
            <h1>
              Good food.
              <br />
              No fuss.
            </h1>
            <p>
              Fresh produce, pantry staples, and a shorter shopping list. Start
              with what you need for the week.
            </p>
            <a href="#market-shop">
              Shop this week's basket <ArrowRight size={19} />
            </a>
            <span>PRODUCE / PANTRY / EVERYDAY ESSENTIALS</span>
          </div>
          <img
            src="/concepts/market.webp"
            alt="Fresh vegetables and produce in a grocery market"
            fetchPriority="high"
          />
        </section>
        <div className="market-service">
          <span>Shop by department</span>
          <span>See price per pack</span>
          <span>Choose pickup or delivery</span>
        </div>
        <section className="market-catalog" id="market-shop">
          <div className="market-catalog-heading">
            <h2>On the shopping list.</h2>
            <label>
              <Search size={16} />
              <input
                aria-label="Search groceries"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find your essentials"
              />
            </label>
          </div>
          <div className="market-catalog-layout">
            <aside>
              <p>DEPARTMENTS</p>
              {["Everything", "Produce", "Fruit", "Bakery"].map((category) => (
                <button
                  key={category}
                  aria-pressed={filter === category}
                  onClick={() => setFilter(category)}
                >
                  {category}
                  <ArrowRight size={14} />
                </button>
              ))}
              <div className="market-pickup">
                <strong>
                  {delivery === "Pickup"
                    ? "Collect your basket."
                    : "A basket to your door."}
                </strong>
                <p>
                  {delivery === "Pickup"
                    ? "No sample delivery fee. Choose pickup when reviewing your bag."
                    : "An illustrative PHP 90 delivery fee appears in the sample bag."}
                </p>
              </div>
            </aside>
            <div>
              <div className="market-products">
                {products.map((product) => (
                  <article key={product.id}>
                    <div className="market-product-photo">
                      <img
                        src={
                          "/concepts/" +
                          product.image +
                          (product.image?.endsWith("svg") ? "" : ".webp")
                        }
                        alt={product.name}
                        loading="lazy"
                      />
                    </div>
                    <p>
                      {product.group} / {product.unit}
                    </p>
                    <h3>{product.name}</h3>
                    <div>
                      <strong>{php(product.price)}</strong>
                      <button
                        onClick={() => bag.add(product)}
                        aria-label={"Add " + product.name}
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              {products.length === 0 && (
                <p className="market-empty">
                  No matching groceries. Try another department or search.
                </p>
              )}
              <p role="status" className="store-notice">
                {bag.notice}
              </p>
            </div>
          </div>
        </section>
        <section id="market-guide" className="market-guide">
          <h2>
            Less searching.
            <br />
            More cooking.
          </h2>
          <div>
            <h3>Build your basket</h3>
            <p>
              Browse by department. Every item shows its pack size and sample
              price.
            </p>
            <h3>Check the details</h3>
            <p>
              Adjust quantities in the basket. Switch between pickup and
              delivery before you review.
            </p>
            <h3>Try it without an account</h3>
            <p>
              This portfolio demo ends with an order summary. No real grocery
              order is sent.
            </p>
          </div>
        </section>
      </main>
      <Note />
      {bag.open && <Bag bag={bag} fee={delivery === "Delivery" ? 90 : 0} />}
    </div>
  );
}

const recipes: Product[] = [
  {
    id: "chicken",
    name: "Chicken + brown rice",
    price: 890,
    unit: "2 kg",
    group: "Everyday",
    image: "#d26742",
  },
  {
    id: "salmon",
    name: "Salmon + sweet potato",
    price: 1090,
    unit: "2 kg",
    group: "Everyday",
    image: "#849baf",
  },
  {
    id: "turkey",
    name: "Turkey training bites",
    price: 290,
    unit: "150 g",
    group: "Treats",
    image: "#b3a24a",
  },
];
function FoodPack({ product }: { product: Product }) {
  return (
    <div
      className="morrow-pack"
      style={{ "--pack-color": product.image } as React.CSSProperties}
    >
      <span>
        FOR THE DOG.
        <br />
        NOT THE HYPE.
      </span>
      <strong>
        morrow<span>dog food</span>
      </strong>
      <div className="morrow-pack-line" />
      <p>{product.name}</p>
      <small>{product.unit} / CONCEPT PACKAGING</small>
    </div>
  );
}
export function Morrow() {
  const [filter, setFilter] = useState("All recipes");
  const [selected, setSelected] = useState(recipes[0]);
  const bag = useBag();
  return (
    <div className="morrow sample-store">
      <header>
        <a className="morrow-logo" href="#morrow-home">
          morrow<span>FOOD FOR YOUR FAVORITE PERSON.</span>
        </a>
        <nav aria-label="Dog food navigation">
          <a href="#morrow-food">The food</a>
          <a href="#morrow-detail">What's inside</a>
        </nav>
        <button onClick={() => bag.setOpen(true)}>Bag / {bag.count}</button>
      </header>
      <main id="morrow-home">
        <section className="morrow-hero">
          <div className="morrow-title">
            <p>LESS GUESSING. MORE TAIL WAGGING.</p>
            <h1>
              A very good
              <br />
              day starts
              <br />
              with dinner.
            </h1>
            <a href="#morrow-food">
              Find their next favorite <ArrowDown size={20} />
            </a>
          </div>
          <div className="morrow-portrait">
            <img
              src="/concepts/dog.webp"
              alt="Golden retriever looking toward the camera"
              fetchPriority="high"
            />
            <span>
              FOR THE ONES
              <br />
              WHO WAIT BY THE DOOR.
            </span>
          </div>
          <div className="morrow-hero-pack">
            <FoodPack product={selected} />
          </div>
        </section>
        <section className="morrow-products" id="morrow-food">
          <div className="morrow-section-top">
            <h2>Pick a bowl-filler.</h2>
            <div role="group" aria-label="Filter dog food">
              {["All recipes", "Everyday", "Treats"].map((category) => (
                <button
                  key={category}
                  aria-pressed={filter === category}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="morrow-product-grid">
            {recipes
              .filter(
                (product) =>
                  filter === "All recipes" || product.group === filter,
              )
              .map((product) => (
                <article key={product.id}>
                  <button
                    className="morrow-pack-preview"
                    onClick={() => setSelected(product)}
                    aria-label={"Preview " + product.name}
                  >
                    <FoodPack product={product} />
                  </button>
                  <div>
                    <p>
                      {product.group} / {product.unit}
                    </p>
                    <h3>{product.name}</h3>
                    <strong>{php(product.price)}</strong>
                    <button
                      className="morrow-add"
                      onClick={() => bag.add(product)}
                    >
                      Add to bag <Plus size={17} />
                    </button>
                  </div>
                </article>
              ))}
          </div>
          <p role="status" className="store-notice">
            {bag.notice}
          </p>
        </section>
        <section className="morrow-detail" id="morrow-detail">
          <h2>
            Clear labels.
            <br />
            Better questions.
          </h2>
          <div>
            <p>
              Packaging should help you compare, not make you guess. Select a
              recipe above to see its concept pack.
            </p>
            <h3>{selected.name}</h3>
            <p>
              Pack size: {selected.unit}. Sample price: {php(selected.price)}.
            </p>
            <p>
              This is a fictional product and shopping experience. It does not
              claim veterinary approval, nutritional completeness, or health
              outcomes. For a real dog's dietary needs, consult a qualified
              veterinarian.
            </p>
          </div>
        </section>
      </main>
      <Note />
      {bag.open && <Bag bag={bag} />}
    </div>
  );
}

const gear: Product[] = [
  {
    id: "ball",
    name: "Court / 07 Basketball",
    price: 1450,
    unit: "size 7",
    group: "Equipment",
    image: "ball",
  },
  {
    id: "jersey",
    name: "Practice Jersey",
    price: 790,
    unit: "jersey",
    group: "Apparel",
    image: "jersey",
  },
  {
    id: "tee",
    name: "Off-Court Tee",
    price: 650,
    unit: "tee",
    group: "Apparel",
    image: "tee",
  },
];
function GearArt({ kind }: { kind: string }) {
  return (
    <svg
      viewBox="0 0 400 350"
      role="img"
      aria-label={
        kind === "ball"
          ? "Original basketball product illustration"
          : "Original sports apparel illustration"
      }
    >
      {kind === "ball" ? (
        <>
          <defs>
            <radialGradient id="ball-shade" cx="30%" cy="25%">
              <stop stopColor="#efa258" />
              <stop offset="1" stopColor="#a74317" />
            </radialGradient>
          </defs>
          <ellipse
            cx="200"
            cy="298"
            rx="110"
            ry="14"
            fill="#000"
            opacity=".12"
          />
          <circle
            cx="200"
            cy="170"
            r="115"
            fill="url(#ball-shade)"
            stroke="#402921"
            strokeWidth="3"
          />
          <g stroke="#402921" strokeWidth="4" fill="none">
            <path d="M85 170h230M200 55v230M116 92q165 30 165 155M116 248q165-30 165-155" />
          </g>
          <text
            x="200"
            y="161"
            textAnchor="middle"
            fontSize="17"
            fontFamily="sans-serif"
            fontWeight="700"
            fill="#33251e"
          >
            HALFCOURT
          </text>
        </>
      ) : (
        <>
          <ellipse
            cx="200"
            cy="310"
            rx="115"
            ry="12"
            fill="#000"
            opacity=".1"
          />
          <path
            d={
              kind === "jersey"
                ? "M150 50l-55 42 38 66 17-9v145h100V149l17 9 38-66-55-42q-50 36-100 0Z"
                : "M145 50L70 95l35 68 40-21v152h110V142l40 21 35-68-75-45q-55 35-110 0Z"
            }
            fill={kind === "jersey" ? "#e36a24" : "#e9e8df"}
            stroke="#2c2d2e"
            strokeWidth="3"
          />
          <path
            d="M151 54q49 75 98 0"
            fill="none"
            stroke="#292a2b"
            strokeWidth="10"
          />
          <text
            x="200"
            y="161"
            textAnchor="middle"
            fontFamily="sans-serif"
            fontSize="17"
            fontWeight="700"
            fill="#26272a"
          >
            HALFCOURT
          </text>
          <text
            x="200"
            y="225"
            textAnchor="middle"
            fontFamily="sans-serif"
            fontSize="57"
            fontWeight="800"
            fill="#26272a"
          >
            07
          </text>
        </>
      )}
    </svg>
  );
}
export function Halfcourt() {
  const [filter, setFilter] = useState("All gear");
  const [sizes, setSizes] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const bag = useBag();
  return (
    <div className="halfcourt sample-store">
      <header>
        <a href="#court-home">
          HALFCOURT<span>BUILT FOR THE NEXT RUN.</span>
        </a>
        <nav aria-label="Sports shop navigation">
          <a href="#court-shop">Shop gear</a>
          <a href="#court-notes">Court notes</a>
        </nav>
        <button onClick={() => bag.setOpen(true)}>BAG [{bag.count}]</button>
      </header>
      <main id="court-home">
        <section className="court-hero">
          <img
            src="/concepts/basketball.webp"
            alt="Basketball court and hoop photographed during play"
            fetchPriority="high"
          />
          <div className="court-hero-shade" />
          <div>
            <p>NO SIDELINES. JUST THE GAME.</p>
            <h1>
              MAKE
              <br />
              YOUR
              <br />
              <span>NEXT.</span>
            </h1>
            <a href="#court-shop">
              GEAR UP <ArrowDown size={24} />
            </a>
          </div>
          <span className="court-caption">THE COURT IS THE COMMON GROUND.</span>
        </section>
        <div className="court-ticker">EARLY RUNS. LATE GAMES. SAME LOVE.</div>
        <section className="court-shop" id="court-shop">
          <div className="court-shop-heading">
            <h2>THE STARTING LINEUP.</h2>
            <div role="group" aria-label="Filter sports gear">
              {["All gear", "Equipment", "Apparel"].map((category) => (
                <button
                  key={category}
                  aria-pressed={filter === category}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="court-products">
            {gear
              .filter(
                (product) => filter === "All gear" || product.group === filter,
              )
              .map((product) => (
                <article key={product.id}>
                  <div className="court-product-art">
                    <GearArt kind={product.image!} />
                    <span>{product.group.toUpperCase()}</span>
                  </div>
                  <div className="court-product-title">
                    <h3>{product.name}</h3>
                    <strong>{php(product.price)}</strong>
                  </div>
                  {product.group === "Apparel" ? (
                    <label>
                      Choose size
                      <select
                        aria-label={product.name + " size"}
                        value={sizes[product.id] ?? ""}
                        onChange={(event) =>
                          setSizes({
                            ...sizes,
                            [product.id]: event.target.value,
                          })
                        }
                      >
                        <option value="">Select size</option>
                        {["S", "M", "L", "XL"].map((size) => (
                          <option key={size}>{size}</option>
                        ))}
                      </select>
                    </label>
                  ) : (
                    <p className="court-size-note">
                      SIZE 7 / ORIGINAL CONCEPT PRODUCT
                    </p>
                  )}
                  <button
                    className="court-add"
                    onClick={() => {
                      if (product.group === "Apparel" && !sizes[product.id]) {
                        setError(
                          "Choose a size for " + product.name + " first.",
                        );
                        return;
                      }
                      setError("");
                      const size = sizes[product.id];
                      bag.add({
                        ...product,
                        id: product.id + (size ? "-" + size : ""),
                        name: product.name + (size ? " / " + size : ""),
                      });
                    }}
                  >
                    ADD TO BAG <Plus size={17} />
                  </button>
                </article>
              ))}
          </div>
          <p role="status" className="store-notice">
            {error || bag.notice}
          </p>
        </section>
        <section className="court-notes" id="court-notes">
          <span>COURT NOTES / INDEPENDENT DESIGN STUDY</span>
          <h2>
            NOT MADE
            <br />
            FOR THE BENCH.
          </h2>
          <p>
            A sports storefront built around fast product discovery, readable
            sizing, and a bag that keeps each selected size separate. No
            invented athletes, sponsorships, or customer reviews.
          </p>
        </section>
      </main>
      <Note />
      {bag.open && <Bag bag={bag} />}
    </div>
  );
}

const trails = [
  {
    name: "The first-light loop",
    level: "Easy",
    distance: "4.2 km",
    hours: 2,
    price: 650,
    note: "A shorter introduction to the trail, with room to stop and look around.",
  },
  {
    name: "Above the treeline",
    level: "Moderate",
    distance: "9.8 km",
    hours: 5,
    price: 1250,
    note: "A longer day with steady climbing and wide-open ridge views.",
  },
  {
    name: "The long way home",
    level: "Challenging",
    distance: "16 km",
    hours: 8,
    price: 1950,
    note: "A full-day route for experienced hikers comfortable with sustained climbs.",
  },
];
export function Ridgeline() {
  const [level, setLevel] = useState("All trails");
  const [chosen, setChosen] = useState(0);
  const [people, setPeople] = useState(2);
  const [quoted, setQuoted] = useState(false);
  return (
    <div className="ridgeline">
      <header>
        <a href="#ridge-home">
          RIDGELINE<span>OUTSIDE IS A GOOD PLACE TO START.</span>
        </a>
        <nav aria-label="Trail website navigation">
          <a href="#ridge-trails">Find a trail</a>
          <a href="#ridge-plan">Plan a day</a>
        </nav>
      </header>
      <main id="ridge-home">
        <section className="ridge-hero">
          <img
            src="/concepts/mountain.webp"
            alt="Mountain ridges rising above the surrounding landscape"
            fetchPriority="high"
          />
          <div />
          <p>SMALL GROUPS. LONG VIEWS.</p>
          <h1>
            Leave a little
            <br />
            room for <span>outside.</span>
          </h1>
          <a href="#ridge-trails">
            Find your pace <ArrowDown size={18} />
          </a>
          <span className="ridge-image-note">
            REFERENCE PHOTOGRAPHY / CONCEPT DESTINATION
          </span>
        </section>
        <section className="ridge-trails" id="ridge-trails">
          <div className="ridge-section-heading">
            <h2>A day that fits you.</h2>
            <p>Start with the distance and effort. The view is a bonus.</p>
          </div>
          <div
            className="ridge-filters"
            role="group"
            aria-label="Filter trails by difficulty"
          >
            {["All trails", "Easy", "Moderate", "Challenging"].map((value) => (
              <button
                key={value}
                aria-pressed={level === value}
                onClick={() => setLevel(value)}
              >
                {value}
              </button>
            ))}
          </div>
          {trails
            .filter((trail) => level === "All trails" || trail.level === level)
            .map((trail) => (
              <article key={trail.name}>
                <span className="ridge-level">{trail.level}</span>
                <div>
                  <h3>{trail.name}</h3>
                  <p>{trail.note}</p>
                </div>
                <div className="ridge-trail-data">
                  <span>{trail.distance}</span>
                  <span>~{trail.hours} hours</span>
                </div>
                <a
                  href="#ridge-plan"
                  onClick={() => {
                    setChosen(trails.indexOf(trail));
                    setQuoted(false);
                  }}
                >
                  Plan this day <ArrowUpRight size={17} />
                </a>
              </article>
            ))}
        </section>
        <section className="ridge-plan" id="ridge-plan">
          <div>
            <p>MAKE A LITTLE SPACE IN THE CALENDAR.</p>
            <h2>
              Take the
              <br />
              scenic route.
            </h2>
            <span>
              Fictional routes and sample pricing. This is not a trail-safety
              guide or a bookable excursion.
            </span>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setQuoted(true);
            }}
          >
            <label>
              Your kind of day
              <select
                value={chosen}
                onChange={(event) => {
                  setChosen(Number(event.target.value));
                  setQuoted(false);
                }}
              >
                {trails.map((trail, index) => (
                  <option key={trail.name} value={index}>
                    {trail.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              People in your group
              <input
                type="number"
                min={1}
                max={8}
                value={people}
                onChange={(event) => {
                  setPeople(
                    Math.min(8, Math.max(1, Number(event.target.value))),
                  );
                  setQuoted(false);
                }}
                required
              />
            </label>
            <p>
              Sample guide rate{" "}
              <strong>{php(trails[chosen].price)} / person</strong>
            </p>
            <button type="submit">
              See the sample total <ArrowRight size={18} />
            </button>
            {quoted && (
              <div className="ridge-quote" role="status">
                <strong>{php(trails[chosen].price * people)}</strong>
                <p>
                  Illustrative total for {people} people. No booking has been
                  made and no payment or personal information is collected.
                </p>
              </div>
            )}
          </form>
        </section>
      </main>
      <Note />
    </div>
  );
}

export function Clearline() {
  const [kind, setKind] = useState("Order question");
  const [urgent, setUrgent] = useState(false);
  const [run, setRun] = useState(false);
  const [runs, setRuns] = useState(40);
  const [minutes, setMinutes] = useState(6);
  const destination =
    kind === "Invoice"
      ? "Finance review"
      : kind === "Technical issue"
        ? "Technical support"
        : "Customer support";
  return (
    <div className="clearline">
      <header>
        <a href="#clear-home">clearline_</a>
        <nav aria-label="Automation studio navigation">
          <a href="#clear-workflow">Workflow demo</a>
          <a href="#clear-value">Time calculator</a>
        </nav>
        <a href="#clear-workflow" className="clear-header-link">
          RUN A TEST <ArrowUpRight size={15} />
        </a>
      </header>
      <main id="clear-home">
        <section className="clear-hero">
          <p>WORKFLOW DESIGN / SYSTEMS THAT MAKE SENSE</p>
          <h1>
            Give the repetitive
            <br />
            work a <span>system.</span>
          </h1>
          <div>
            <p>
              A concept for an automation studio. Start with one handoff, make
              the rules visible, and keep a person in control.
            </p>
            <a href="#clear-workflow">
              Inspect a sample workflow <ArrowDown size={18} />
            </a>
          </div>
          <div
            className="clear-process"
            aria-label="Workflow: receive, classify, route, review"
          >
            <span>RECEIVE</span>
            <ArrowRight />
            <span>CLASSIFY</span>
            <ArrowRight />
            <span>ROUTE</span>
            <ArrowRight />
            <strong>HUMAN REVIEW</strong>
          </div>
        </section>
        <section className="clear-workflow" id="clear-workflow">
          <div>
            <p>TRY THE SYSTEM, NOT A SALES CLAIM.</p>
            <h2>
              One request.
              <br />A clearer next step.
            </h2>
            <p>
              Choose an incoming request and run the routing rule. This is a
              deterministic browser simulation, not a connected AI model.
            </p>
            <ul>
              <li>Inputs stay in this page</li>
              <li>Routing is explainable</li>
              <li>A human reviews the result</li>
            </ul>
          </div>
          <div className="clear-terminal">
            <div className="clear-terminal-bar">
              <span>routing-preview.ts</span>
              <span>LOCAL SIMULATION</span>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setRun(true);
              }}
            >
              <label>
                request.type
                <select
                  value={kind}
                  onChange={(event) => {
                    setKind(event.target.value);
                    setRun(false);
                  }}
                >
                  <option>Order question</option>
                  <option>Invoice</option>
                  <option>Technical issue</option>
                </select>
              </label>
              <label className="clear-checkbox">
                <input
                  type="checkbox"
                  checked={urgent}
                  onChange={(event) => {
                    setUrgent(event.target.checked);
                    setRun(false);
                  }}
                />{" "}
                Mark as urgent
              </label>
              <button type="submit">
                RUN WORKFLOW <ArrowRight size={16} />
              </button>
            </form>
            <div className="clear-result" role="status">
              {run ? (
                <>
                  <p>
                    <Check size={14} /> rule matched
                  </p>
                  <dl>
                    <dt>destination</dt>
                    <dd>{destination}</dd>
                    <dt>priority</dt>
                    <dd>{urgent ? "High / human review first" : "Normal"}</dd>
                    <dt>next_action</dt>
                    <dd>Draft response for review</dd>
                  </dl>
                  <p>No request was sent. No automated reply was published.</p>
                </>
              ) : (
                <p>Waiting for sample input...</p>
              )}
            </div>
          </div>
        </section>
        <section className="clear-value" id="clear-value">
          <div>
            <p>BEFORE YOU AUTOMATE, MEASURE.</p>
            <h2>
              What is the
              <br />
              repetition costing?
            </h2>
            <p>
              A simple planning estimate, not a promised saving. Setup,
              exceptions, and human review still take time.
            </p>
          </div>
          <div>
            <label>
              Repetitions per week
              <input
                type="number"
                min="1"
                max="10000"
                value={runs}
                onChange={(event) =>
                  setRuns(
                    Math.min(10000, Math.max(1, Number(event.target.value))),
                  )
                }
              />
            </label>
            <label>
              Minutes per repetition
              <input
                type="number"
                min="1"
                max="480"
                value={minutes}
                onChange={(event) =>
                  setMinutes(
                    Math.min(480, Math.max(1, Number(event.target.value))),
                  )
                }
              />
            </label>
            <output aria-live="polite">
              <strong>{((runs * minutes) / 60).toFixed(1)}</strong> hours/week
              of manual repetition
            </output>
            <span>repetitions x minutes / 60</span>
          </div>
        </section>
      </main>
      <Note photos={false} />
    </div>
  );
}
