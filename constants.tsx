import React from 'react';
import type { Utility, UtilityCategory } from './types';

// Icon Components
const CalendarDaysIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M12 12.75h.008v.008H12v-.008Z" />
  </svg>
);

const GlobeAltIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
);

const LockClosedIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>
);

const LanguageIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
    </svg>
);

const CalculatorIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm3-6h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm3-6h.008v.008H14.25v-.008zm0 3h.008v.008H14.25v-.008zm0 3h.008v.008H14.25v-.008zM4.5 12.75h15" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5v.75A2.25 2.25 0 0116.5 22.5h-9a2.25 2.25 0 01-2.25-2.25v-.75m13.5-9V3.75A2.25 2.25 0 0016.5 1.5h-9a2.25 2.25 0 00-2.25 2.25v6.75m13.5 0" />
    </svg>
);

const SwatchIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);

const BeakerIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.42-8.775 4.5 4.5 0 018.34-3.996 4.5 4.5 0 011.42 8.775 4.5 4.5 0 01-8.34 3.996z" />
    </svg>
);

const SparklesIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a3.375 3.375 0 00-2.658-2.658L11.25 18l1.938-.648a3.375 3.375 0 002.658-2.658L16.25 13.5l.648 1.938a3.375 3.375 0 002.658 2.658L21 18.75l-1.938.648a3.375 3.375 0 00-2.658 2.658z" />
    </svg>
);

const DocumentTextIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

const FingerPrintIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.588 8.26l-1.064-1.063a6.75 6.75 0 00-1.28-5.021l-1.74-1.74a6.75 6.75 0 00-5.022-1.28l-1.063-1.063A7.5 7.5 0 017.864 4.243zM4.5 10.5a6.75 6.75 0 011.28-4.243l-1.064-1.063A7.5 7.5 0 003 10.5c0 2.92.556 5.709 1.588 8.26l1.064-1.063A6.75 6.75 0 014.5 10.5zM12 12.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zM12 21a9 9 0 100-18 9 9 0 000 18z" />
    </svg>
);

const QrCodeIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 15.75h.008v.008h-.008v-.008zM14.25 18.75h.008v.008h-.008v-.008zM17.25 15.75h.008v.008h-.008v-.008zM17.25 18.75h.008v.008h-.008v-.008zM20.25 15.75h.008v.008h-.008v-.008zM20.25 18.75h.008v.008h-.008v-.008z" />
    </svg>
);

const ClockIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CodeBracketIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
);

const KeyIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
  </svg>
);

const ArrowPathIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691L7.5 4.5m11.667 0l-3.181 3.183a8.25 8.25 0 01-11.667 0L2.985 15.644" />
    </svg>
);


// Lazy Loaded Components
const AgeCalculator = React.lazy(() => import('./components/utilities/AgeCalculator'));
const JulianDateConverter = React.lazy(() => import('./components/utilities/JulianDateConverter'));
const PasswordCrypter = React.lazy(() => import('./components/utilities/PasswordCrypter'));
const CaseConverter = React.lazy(() => import('./components/utilities/CaseConverter'));
const Counter = React.lazy(() => import('./components/utilities/Counter'));
const ColorConverter = React.lazy(() => import('./components/utilities/ColorConverter'));
const UnitConverter = React.lazy(() => import('./components/utilities/UnitConverter'));
const RandomNumberGenerator = React.lazy(() => import('./components/utilities/RandomNumberGenerator'));
const LoremIpsumGenerator = React.lazy(() => import('./components/utilities/LoremIpsumGenerator'));
const HashGenerator = React.lazy(() => import('./components/utilities/HashGenerator'));
const QrCodeGenerator = React.lazy(() => import('./components/utilities/QrCodeGenerator'));
const TimezoneConverter = React.lazy(() => import('./components/utilities/TimezoneConverter'));
const JsonFormatter = React.lazy(() => import('./components/utilities/JsonFormatter'));
const GuidGenerator = React.lazy(() => import('./components/utilities/GuidGenerator'));
const FileConverter = React.lazy(() => import('./components/utilities/FileConverter'));


// Component Wrapper for Suspense
const SuspenseWrapper = (Component: React.FC) => {
    return (
        <React.Suspense fallback={<div className="text-center p-8">Loading...</div>}>
            <Component />
        </React.Suspense>
    );
};


export const UTILITIES: Utility[] = [
    {
        id: 'age-calculator',
        name: 'Age Calculator',
        description: 'Calculate age from a date of birth to the current date.',
        icon: CalendarDaysIcon,
        component: () => SuspenseWrapper(AgeCalculator),
        category: 'Calculators',
    },
    {
        id: 'counter',
        name: 'Character & Word Counter',
        description: 'Count characters, words, sentences, and paragraphs in a text.',
        icon: CalculatorIcon,
        component: () => SuspenseWrapper(Counter),
        category: 'Calculators',
    },
    {
        id: 'julian-date-converter',
        name: 'Julian Date Converter',
        description: 'Convert a standard calendar date to a Julian date number.',
        icon: GlobeAltIcon,
        component: () => SuspenseWrapper(JulianDateConverter),
        category: 'Converters',
    },
    {
        id: 'case-converter',
        name: 'Case Converter',
        description: 'Convert text to various cases like UPPERCASE, lowercase, etc.',
        icon: LanguageIcon,
        component: () => SuspenseWrapper(CaseConverter),
        category: 'Converters',
    },
    {
        id: 'color-converter',
        name: 'Color Converter',
        description: 'Convert colors between HEX, RGB, and HSL formats.',
        icon: SwatchIcon,
        component: () => SuspenseWrapper(ColorConverter),
        category: 'Converters',
    },
    {
        id: 'unit-converter',
        name: 'Unit Converter',
        description: 'Convert between various units of measurement (e.g., length, mass).',
        icon: BeakerIcon,
        component: () => SuspenseWrapper(UnitConverter),
        category: 'Converters',
    },
    {
        id: 'timezone-converter',
        name: 'Timezone Converter',
        description: 'Convert time between different timezones around the world.',
        icon: ClockIcon,
        component: () => SuspenseWrapper(TimezoneConverter),
        category: 'Converters',
    },
     {
        id: 'file-converter',
        name: 'File Converter',
        description: 'Convert files between formats like PNG, JPG, and PDF.',
        icon: ArrowPathIcon,
        component: () => SuspenseWrapper(FileConverter),
        category: 'Converters',
    },
    {
        id: 'password-crypter',
        name: 'Password Crypter',
        description: 'Encrypt and decrypt text using Base64 encoding. Not for security.',
        icon: LockClosedIcon,
        component: () => SuspenseWrapper(PasswordCrypter),
        category: 'Generators',
    },
    {
        id: 'random-number-generator',
        name: 'Random Number Generator',
        description: 'Generate a random number within a specified minimum and maximum range.',
        icon: SparklesIcon,
        component: () => SuspenseWrapper(RandomNumberGenerator),
        category: 'Generators',
    },
    {
        id: 'lorem-ipsum-generator',
        name: 'Lorem Ipsum Generator',
        description: 'Create placeholder text for your designs and mockups.',
        icon: DocumentTextIcon,
        component: () => SuspenseWrapper(LoremIpsumGenerator),
        category: 'Generators',
    },
    {
        id: 'hash-generator',
        name: 'Hash Generator',
        description: 'Generate MD5 and SHA hashes from any text input.',
        icon: FingerPrintIcon,
        component: () => SuspenseWrapper(HashGenerator),
        category: 'Generators',
    },
    {
        id: 'qr-code-generator',
        name: 'QR Code Generator',
        description: 'Generate a QR code from a URL or any text.',
        icon: QrCodeIcon,
        component: () => SuspenseWrapper(QrCodeGenerator),
        category: 'Generators',
    },
    {
        id: 'guid-generator',
        name: 'GUID Generator',
        description: 'Generate a new universally unique identifier (UUID v4).',
        icon: KeyIcon,
        component: () => SuspenseWrapper(GuidGenerator),
        category: 'Generators',
    },
    {
        id: 'json-formatter',
        name: 'JSON Formatter & Validator',
        description: 'Format, validate, and beautify your JSON data.',
        icon: CodeBracketIcon,
        component: () => SuspenseWrapper(JsonFormatter),
        category: 'Formatters & Validators',
    },
];