import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  Plus,
  Trash2,
} from "lucide-react";
import "./ledger.css";

type Entry = {
  id: number;
  name: string;
  category: string;
  amount: number;
  day: number;
  month: string;
};
const initial: Entry[] = [
  {
    id: 1,
    name: "Monthly pay",
    category: "Income",
    amount: 35000,
    day: 1,
    month: "October",
  },
  {
    id: 2,
    name: "Apartment",
    category: "Home",
    amount: -8500,
    day: 2,
    month: "October",
  },
  {
    id: 3,
    name: "Weekly groceries",
    category: "Food",
    amount: -1420,
    day: 5,
    month: "October",
  },
  {
    id: 4,
    name: "Bus & train",
    category: "Transport",
    amount: -480,
    day: 8,
    month: "October",
  },
  {
    id: 5,
    name: "Internet",
    category: "Home",
    amount: -1299,
    day: 10,
    month: "October",
  },
  {
    id: 6,
    name: "Bookshop",
    category: "Personal",
    amount: -650,
    day: 16,
    month: "October",
  },
  {
    id: 7,
    name: "Monthly pay",
    category: "Income",
    amount: 35000,
    day: 1,
    month: "September",
  },
  {
    id: 8,
    name: "Apartment",
    category: "Home",
    amount: -8500,
    day: 2,
    month: "September",
  },
  {
    id: 9,
    name: "Groceries & daily expenses",
    category: "Food",
    amount: -6400,
    day: 15,
    month: "September",
  },
];
const money = (amount: number) =>
  "PHP " + amount.toLocaleString("en-PH", { maximumFractionDigits: 2 });
export default function Ledger() {
  const [entries, setEntries] = useState(initial);
  const [month, setMonth] = useState("October");
  const [filter, setFilter] = useState("All");
  const [limit, setLimit] = useState(22000);
  const [message, setMessage] = useState("");
  const current = entries.filter((entry) => entry.month === month);
  const income = current
    .filter((entry) => entry.amount > 0)
    .reduce((sum, entry) => sum + entry.amount, 0);
  const spending = -current
    .filter((entry) => entry.amount < 0)
    .reduce((sum, entry) => sum + entry.amount, 0);
  const categories = ["Home", "Food", "Transport", "Personal"];
  const maximum = Math.max(
    1,
    ...categories.map(
      (category) =>
        -current
          .filter((entry) => entry.category === category)
          .reduce((sum, entry) => sum + entry.amount, 0),
    ),
  );
  function exportCsv() {
    const csvText = (value: string) => {
      const safe = /^[=+\-@\t\r]/.test(value) ? "'" + value : value;
      return '"' + safe.replaceAll('"', '""') + '"';
    };
    const csv =
      "Description,Category,Amount,Month\n" +
      current
        .map((entry) =>
          [
            csvText(entry.name),
            csvText(entry.category),
            entry.amount,
            csvText(entry.month),
          ].join(","),
        )
        .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "ledger-sample-" + month.toLowerCase() + ".csv";
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage("Sample transactions exported. No bank account is connected.");
  }
  return (
    <div className="ledger">
      <header>
        <strong>
          ledger<span>/</span>
        </strong>
        <span>PERSONAL CASH FLOW</span>
        <button onClick={exportCsv}>
          <Download size={15} /> Export CSV
        </button>
      </header>
      <main>
        <div className="ledger-heading">
          <div>
            <p>YOUR MONEY, IN PLAIN SIGHT</p>
            <h3>The monthly picture.</h3>
          </div>
          <label>
            Sample period
            <select
              value={month}
              onChange={(event) => {
                setMonth(event.target.value);
                setMessage("");
              }}
            >
              <option>October</option>
              <option>September</option>
            </select>
          </label>
        </div>
        <section className="ledger-metrics" aria-label="Cash flow summary">
          <div className="ledger-balance">
            <p>LEFT AFTER EXPENSES</p>
            <strong>{money(income - spending)}</strong>
            <span>Sample ledger balance, not a bank balance</span>
          </div>
          <div>
            <ArrowDownLeft />
            <p>Income</p>
            <strong>{money(income)}</strong>
          </div>
          <div>
            <ArrowUpRight />
            <p>Spent</p>
            <strong>{money(spending)}</strong>
          </div>
        </section>
        <div className="ledger-columns">
          <section className="ledger-spending">
            <div className="ledger-section-title">
              <h4>Where it went</h4>
              <span>BY CATEGORY / PHP</span>
            </div>
            <div
              className="ledger-bars"
              role="img"
              aria-label={categories
                .map(
                  (category) =>
                    category +
                    ": " +
                    money(
                      -current
                        .filter((entry) => entry.category === category)
                        .reduce((sum, entry) => sum + entry.amount, 0),
                    ),
                )
                .join("; ")}
            >
              {categories.map((category) => {
                const value = -current
                  .filter((entry) => entry.category === category)
                  .reduce((sum, entry) => sum + entry.amount, 0);
                return (
                  <div key={category}>
                    <div>
                      <span>{category}</span>
                      <strong>{value.toLocaleString()}</strong>
                    </div>
                    <div className="ledger-track">
                      <span style={{ width: (value / maximum) * 100 + "%" }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <label className="ledger-limit">
              Monthly spending limit
              <input
                type="number"
                min="1"
                max="1000000"
                value={limit}
                onChange={(event) =>
                  setLimit(
                    Math.min(1000000, Math.max(1, Number(event.target.value))),
                  )
                }
              />
            </label>
            <progress
              max={limit}
              value={Math.min(spending, limit)}
              aria-label="Monthly spending versus limit"
            />
            <p className="ledger-budget-note">
              {spending > limit
                ? money(spending - limit) + " over your sample limit."
                : money(limit - spending) + " left within your sample limit."}
            </p>
          </section>
          <section className="ledger-entry">
            <p>A SMALL HABIT, A CLEARER PICTURE</p>
            <h4>Record a transaction.</h4>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const form = event.currentTarget;
                const values = new FormData(form);
                const name = String(values.get("name") ?? "").trim();
                const amount = Number(values.get("amount"));
                if (
                  !name ||
                  !Number.isFinite(amount) ||
                  amount <= 0 ||
                  amount > 1000000
                )
                  return;
                const category = String(values.get("category"));
                setEntries([
                  ...entries,
                  {
                    id: Date.now(),
                    name,
                    category,
                    amount: category === "Income" ? amount : -amount,
                    day: 26,
                    month,
                  },
                ]);
                setMessage(name + " added to " + month + ".");
                form.reset();
              }}
            >
              <label>
                Description
                <input
                  name="name"
                  placeholder="e.g. Weekend groceries"
                  required
                  maxLength={60}
                />
              </label>
              <div>
                <label>
                  Amount (PHP)
                  <input
                    name="amount"
                    type="number"
                    min="0.01"
                    step="0.01"
                    max="1000000"
                    required
                    placeholder="0.00"
                  />
                </label>
                <label>
                  Category
                  <select name="category">
                    {[...categories, "Income"].map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </label>
              </div>
              <button type="submit">
                <Plus size={16} /> Add transaction
              </button>
            </form>
          </section>
        </div>
        <section className="ledger-transactions">
          <div className="ledger-section-title">
            <h4>Transaction journal</h4>
            <div role="group" aria-label="Filter transactions">
              {["All", "Income", "Expenses"].map((value) => (
                <button
                  key={value}
                  aria-pressed={filter === value}
                  onClick={() => setFilter(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div className="ledger-table">
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {current
                  .filter(
                    (entry) =>
                      filter === "All" ||
                      (filter === "Income"
                        ? entry.amount > 0
                        : entry.amount < 0),
                  )
                  .map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.name}</td>
                      <td>{entry.category}</td>
                      <td className={entry.amount > 0 ? "is-income" : ""}>
                        {entry.amount > 0 ? "+" : "-"}
                        {money(Math.abs(entry.amount))}
                      </td>
                      <td>
                        <button
                          aria-label={"Remove " + entry.name}
                          onClick={() => {
                            setEntries(
                              entries.filter((item) => item.id !== entry.id),
                            );
                            setMessage(entry.name + " removed.");
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
        <p className="ledger-message" role="status">
          {message ||
            "Interactive concept. Fictional transactions; changes reset when closed. No financial advice, account connection, or payment processing."}
        </p>
      </main>
    </div>
  );
}
