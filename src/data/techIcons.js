// Tool name → icon. Brand marks come from Simple Icons (tree-shaken: only these
// are bundled). Brands Simple Icons can't include (AWS, Oracle, SQL Server,
// Bitrix24, OpenAI) and generic concepts use neutral Lucide line icons instead.
import {
    siAngular, siBootstrap, siCloudflare, siCss, siDocker, siFigma, siGithub, siGithubactions,
    siGoogleanalytics, siGsap, siHtml5, siJavascript, siJira, siJsonwebtokens, siLinux, siMongodb,
    siMysql, siN8n, siNextdotjs, siNodedotjs, siOpenjdk, siPhp, siPostgresql, siPostman, siPython,
    siReact, siSpringboot, siTailwindcss, siTypescript, siVercel, siWhatsapp,
} from 'simple-icons';
import { Cloud, CloudCog, Database, HardDrive, ShieldCheck, Sparkles, Table, Users, Webhook } from 'lucide-react';

const brand = icon => ({ path: icon.path, hex: icon.hex, title: icon.title });
const line = Icon => ({ Icon });

export const TECH_ICONS = {
    // Frontend
    'Next.js': brand(siNextdotjs),
    'React.js': brand(siReact),
    React: brand(siReact),
    Angular: brand(siAngular),
    'Tailwind CSS': brand(siTailwindcss),
    Bootstrap: brand(siBootstrap),
    GSAP: brand(siGsap),
    'HTML5 & CSS3': brand(siHtml5),
    CSS: brand(siCss),
    // Backend
    'Node.js': brand(siNodedotjs),
    'Spring Boot': brand(siSpringboot),
    'REST APIs': line(Webhook),
    'JWT Authentication': brand(siJsonwebtokens),
    JWT: brand(siJsonwebtokens),
    RBAC: line(ShieldCheck),
    // Languages
    JavaScript: brand(siJavascript),
    TypeScript: brand(siTypescript),
    Java: brand(siOpenjdk),
    PHP: brand(siPhp),
    Python: brand(siPython),
    SQL: line(Table),
    // Databases
    PostgreSQL: brand(siPostgresql),
    MySQL: brand(siMysql),
    MongoDB: brand(siMongodb),
    'SQL Server': line(Database),
    // Cloud & deployment
    AWS: line(CloudCog),
    'AWS App Runner': line(CloudCog),
    'Amazon S3': line(HardDrive),
    Vercel: brand(siVercel),
    Cloudflare: brand(siCloudflare),
    'Oracle Cloud (OCI)': line(Cloud),
    Docker: brand(siDocker),
    'CI/CD': brand(siGithubactions),
    Linux: brand(siLinux),
    // Tools
    'Git & GitHub': brand(siGithub),
    Bitrix24: line(Users),
    'WhatsApp Business API': brand(siWhatsapp),
    n8n: brand(siN8n),
    'OpenAI API': line(Sparkles),
    'GTM & GA4': brand(siGoogleanalytics),
    Postman: brand(siPostman),
    Figma: brand(siFigma),
    Jira: brand(siJira),
};
