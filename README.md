# Utility Library

![Utility Library Logo](/Logo.png)

A comprehensive collection of 15+ powerful and easy-to-use utility tools, designed for everyday tasks and development needs. This app is built with a clean, futuristic UI and is designed to be easily extensible.

## ✨ Features

The library is organized into four main categories:

### 🧮 Calculators
- **Age Calculator:** Calculate age from a date of birth to the current date.
- **Character & Word Counter:** Count characters, words, sentences, and paragraphs in a text.

### 🔄 Converters
- **Julian Date Converter:** Convert a standard calendar date to a Julian date number.
- **Case Converter:** Convert text to various cases like UPPERCASE, lowercase, Sentence case, and Title Case.
- **Color Converter:** Convert colors between HEX, RGB, and HSL formats.
- **Unit Converter:** Convert between various units of measurement (e.g., length, mass).
- **Timezone Converter:** Convert time between different timezones around the world.
- **File Converter:** Convert files between formats like PNG, JPG, and PDF.

### ⚙️ Generators
- **Password Crypter:** "Encrypt" and "decrypt" text using Base64 encoding (Note: Not for security purposes).
- **Random Number Generator:** Generate a random number within a specified minimum and maximum range.
- **Lorem Ipsum Generator:** Create placeholder text for your designs and mockups.
- **Hash Generator:** Generate SHA-1, SHA-256, and SHA-512 hashes from any text input.
- **QR Code Generator:** Generate a QR code from a URL or any text.
- **GUID Generator:** Generate a new universally unique identifier (UUID v4).

### 📝 Formatters & Validators
- **JSON Formatter & Validator:** Format, validate, and beautify your JSON data.

## 📂 Project Structure

```
.
├── .gitignore
├── App.tsx
├── LICENSE
├── README.md
├── components
│   ├── Sidebar.tsx
│   ├── common
│   │   ├── Button.tsx
│   │   ├── ResultBox.tsx
│   │   └── Select.tsx
│   └── utilities
│       ├── AgeCalculator.tsx
│       ├── CaseConverter.tsx
│       ├── ColorConverter.tsx
│       ├── Counter.tsx
│       ├── FileConverter.tsx
│       ├── GuidGenerator.tsx
│       ├── HashGenerator.tsx
│       ├── JsonFormatter.tsx
│       ├── JulianDateConverter.tsx
│       ├── LoremIpsumGenerator.tsx
│       ├── PasswordCrypter.tsx
│       ├── QrCodeGenerator.tsx
│       ├── RandomNumberGenerator.tsx
│       ├── TimezoneConverter.tsx
│       └── UnitConverter.tsx
├── constants.tsx
├── index.html
├── index.tsx
├── metadata.json
├── package.json
├── public
│   ├── favicon.ico
│   └── logo.png
├── styles.css
├── tsconfig.json
├── types.ts
├── vercel.json
└── vite.config.ts
```

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript
- **Styling:** CSS with custom properties (No CSS framework)
- **Dependencies:** `qrcode.js`, `pdf.js`, `jspdf` for specific tools.
- **Build/Dev:** No build step required for this version. Can be run by opening `index.html`.

## 🚀 Getting Started

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/priyankt3i/utility-library.git
    cd utility-library
    ```

2.  **Install dependencies:**
    This project uses a simple setup without a package manager for frontend dependencies. The required libraries are loaded via CDN in `index.html`. However, for local development, a simple server is needed.
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm start
    ```
    This will serve the project on `http://localhost:3000`.

## 🤝 Contributing

Contributions are welcome and greatly appreciated! If you have an idea for a new utility or want to improve an existing one, please feel free to contribute.

To contribute:
1.  **Fork** the repository.
2.  Create your **Feature Branch** (`git checkout -b feature/AmazingUtility`).
3.  **Commit** your Changes (`git commit -m 'Add some AmazingUtility'`).
4.  **Push** to the Branch (`git push origin feature/AmazingUtility`).
5.  Open a **Pull Request**.

### Adding a New Utility

The project is designed to be modular. To add a new utility:
1.  Create your new component in `components/utilities/`.
2.  Add a new entry for your utility in the `UTILITIES` array in `constants.tsx`.
3.  Add an appropriate icon for your tool.
4.  That's it! The sidebar and routing will handle the rest.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [priyankt3i](https://github.com/priyankt3i) and contributors.
