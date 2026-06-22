  X [ERROR] The symbol "BASE" has already been declared

    src/app/App.tsx:1047:6:
      1047 │ const BASE = `https://${projectId}.supabase.co/functions/v1/make...
           ╵       ~~~~

  The symbol "BASE" was originally declared here:

    src/app/App.tsx:7:6:
      7 │ const BASE = `https://${projectId}.supabase.co/functions/v1/make-se...
        ╵       ~~~~


X [ERROR] The symbol "api" has already been declared

    src/app/App.tsx:1048:6:
      1048 │ const api = async (path: string, opts?: RequestInit) => {
           ╵       ~~~

  The symbol "api" was originally declared here:

    src/app/App.tsx:8:6:
      8 │ const api = async (path: string, opts?: RequestInit) => {
        ╵       ~~~


X [ERROR] The symbol "SEED_PROJECTS" has already been declared

    src/app/App.tsx:1068:6:
      1068 │ const SEED_PROJECTS: Project[] = [
           ╵       ~~~~~~~~~~~~~

  The symbol "SEED_PROJECTS" was originally declared here:

    src/app/App.tsx:28:6:
      28 │ const SEED_PROJECTS: Project[] = [
         ╵       ~~~~~~~~~~~~~


X [ERROR] The symbol "SEED_CV" has already been declared

    src/app/App.tsx:1077:6:
      1077 │ const SEED_CV: CVData = {
           ╵       ~~~~~~~

  The symbol "SEED_CV" was originally declared here:

    src/app/App.tsx:37:6:
      37 │ const SEED_CV: CVData = {
         ╵       ~~~~~~~


X [ERROR] The symbol "SEED_SHOWCASES" has already been declared

    src/app/App.tsx:1117:6:
      1117 │ const SEED_SHOWCASES: Showcase[] = [
           ╵       ~~~~~~~~~~~~~~

  The symbol "SEED_SHOWCASES" was originally declared here:

    src/app/App.tsx:77:6:
      77 │ const SEED_SHOWCASES: Showcase[] = [
         ╵       ~~~~~~~~~~~~~~


X [ERROR] The symbol "CATS" has already been declared

    src/app/App.tsx:1140:6:
      1140 │ const CATS = ["All", "Print Design", "Brand Identity", "Editoria...
           ╵       ~~~~

  The symbol "CATS" was originally declared here:

    src/app/App.tsx:100:6:
      100 │ const CATS = ["All", "Print Design", "Brand Identity", "Editorial...
          ╵       ~~~~


X [ERROR] The symbol "SKILL_CATS" has already been declared

    src/app/App.tsx:1141:6:
      1141 │ const SKILL_CATS = ["Soft Skill", "Hard Skill", "Tool", "Languag...
           ╵       ~~~~~~~~~~

  The symbol "SKILL_CATS" was originally declared here:

    src/app/App.tsx:101:6:
      101 │ const SKILL_CATS = ["Soft Skill", "Hard Skill", "Tool", "Language...
          ╵       ~~~~~~~~~~


X [ERROR] The symbol "PWD" has already been declared

    src/app/App.tsx:1142:6:
      1142 │ const PWD = "rois2024";
           ╵       ~~~

  The symbol "PWD" was originally declared here:

    src/app/App.tsx:102:6:
      102 │ const PWD = "rois2024";
          ╵       ~~~


X [ERROR] The symbol "uploadFile" has already been declared

    src/app/App.tsx:1146:15:
      1146 │ async function uploadFile(file: File, bucket = "portfolio"): Pro...
           ╵                ~~~~~~~~~~

  The symbol "uploadFile" was originally declared here:

    src/app/App.tsx:106:15:
      106 │ async function uploadFile(file: File, bucket = "portfolio"): Prom...
          ╵                ~~~~~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "useData" has already been declared

    src/app/App.tsx:1160:9:
      1160 │ function useData() {
           ╵          ~~~~~~~

  The symbol "useData" was originally declared here:

    src/app/App.tsx:120:9:
      120 │ function useData() {
          ╵          ~~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "Grid" has already been declared

    src/app/App.tsx:1187:9:
      1187 │ function Grid() {
           ╵          ~~~~

  The symbol "Grid" was originally declared here:

    src/app/App.tsx:147:9:
      147 │ function Grid() {
          ╵          ~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "Nav" has already been declared

    src/app/App.tsx:1200:9:
      1200 │ function Nav({ active, onNav }: { active: string; onNav: (s: str...
           ╵          ~~~

  The symbol "Nav" was originally declared here:

    src/app/App.tsx:160:9:
      160 │ function Nav({ active, onNav }: { active: string; onNav: (s: stri...
          ╵          ~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "Hero" has already been declared

    src/app/App.tsx:1230:9:
      1230 │ function Hero({ heroPhoto, onNav }: { heroPhoto: string; onNav: ...
           ╵          ~~~~

  The symbol "Hero" was originally declared here:

    src/app/App.tsx:190:9:
      190 │ function Hero({ heroPhoto, onNav }: { heroPhoto: string; onNav: (...
          ╵          ~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "Work" has already been declared

    src/app/App.tsx:1292:9:
      1292 │ function Work({ projects }: { projects: Project[] }) {
           ╵          ~~~~

  The symbol "Work" was originally declared here:

    src/app/App.tsx:252:9:
      252 │ function Work({ projects }: { projects: Project[] }) {
          ╵          ~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "SliderModal" has already been declared

    src/app/App.tsx:1338:9:
      1338 │ function SliderModal({ s, onClose }: { s: Showcase; onClose: () ...
           ╵          ~~~~~~~~~~~

  The symbol "SliderModal" was originally declared here:

    src/app/App.tsx:298:9:
      298 │ function SliderModal({ s, onClose }: { s: Showcase; onClose: () =...
          ╵          ~~~~~~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "ShowcaseSection" has already been declared

    src/app/App.tsx:1391:9:
      1391 │ function ShowcaseSection({ showcases }: { showcases: Showcase[] ...
           ╵          ~~~~~~~~~~~~~~~

  The symbol "ShowcaseSection" was originally declared here:

    src/app/App.tsx:351:9:
      351 │ function ShowcaseSection({ showcases }: { showcases: Showcase[] }) {
          ╵          ~~~~~~~~~~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "Resume" has already been declared

    src/app/App.tsx:1431:9:
      1431 │ function Resume({ cv }: { cv: CVData }) {
           ╵          ~~~~~~

  The symbol "Resume" was originally declared here:

    src/app/App.tsx:391:9:
      391 │ function Resume({ cv }: { cv: CVData }) {
          ╵          ~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "About" has already been declared

    src/app/App.tsx:1496:9:
      1496 │ function About() {
           ╵          ~~~~~

  The symbol "About" was originally declared here:

    src/app/App.tsx:456:9:
      456 │ function About() {
          ╵          ~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "Services" has already been declared

    src/app/App.tsx:1531:9:
      1531 │ function Services() {
           ╵          ~~~~~~~~

  The symbol "Services" was originally declared here:

    src/app/App.tsx:491:9:
      491 │ function Services() {
          ╵          ~~~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "Contact" has already been declared

    src/app/App.tsx:1561:9:
      1561 │ function Contact() {
           ╵          ~~~~~~~

  The symbol "Contact" was originally declared here:

    src/app/App.tsx:521:9:
      521 │ function Contact() {
          ╵          ~~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "Footer" has already been declared

    src/app/App.tsx:1612:9:
      1612 │ function Footer({ onAdmin }: { onAdmin: () => void }) {
           ╵          ~~~~~~

  The symbol "Footer" was originally declared here:

    src/app/App.tsx:572:9:
      572 │ function Footer({ onAdmin }: { onAdmin: () => void }) {
          ╵          ~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "AdminLogin" has already been declared

    src/app/App.tsx:1628:9:
      1628 │ function AdminLogin({ onLogin, onClose }: { onLogin: () => void;...
           ╵          ~~~~~~~~~~

  The symbol "AdminLogin" was originally declared here:

    src/app/App.tsx:588:9:
      588 │ function AdminLogin({ onLogin, onClose }: { onLogin: () => void; ...
          ╵          ~~~~~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "IC" has already been declared

    src/app/App.tsx:1659:6:
      1659 │ const IC = "w-full bg-[#141313] border border-white/[0.08] px-4 ...
           ╵       ~~

  The symbol "IC" was originally declared here:

    src/app/App.tsx:619:6:
      619 │ const IC = "w-full bg-[#141313] border border-white/[0.08] px-4 p...
          ╵       ~~


X [ERROR] The symbol "AF" has already been declared

    src/app/App.tsx:1661:9:
      1661 │ function AF({ label, children }: { label: string; children: Reac...
           ╵          ~~

  The symbol "AF" was originally declared here:

    src/app/App.tsx:621:9:
      621 │ function AF({ label, children }: { label: string; children: React...
          ╵          ~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "Drawer" has already been declared

    src/app/App.tsx:1665:9:
      1665 │ function Drawer({ title, onClose, onSave, ok, children }: { titl...
           ╵          ~~~~~~

  The symbol "Drawer" was originally declared here:

    src/app/App.tsx:625:9:
      625 │ function Drawer({ title, onClose, onSave, ok, children }: { title...
          ╵          ~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "DelBtn" has already been declared

    src/app/App.tsx:1680:9:
      1680 │ function DelBtn({ id, dc, setDc, onDel }: { id: string; dc: stri...
           ╵          ~~~~~~

  The symbol "DelBtn" was originally declared here:

    src/app/App.tsx:640:9:
      640 │ function DelBtn({ id, dc, setDc, onDel }: { id: string; dc: strin...
          ╵          ~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "PtsMgr" has already been declared

    src/app/App.tsx:1686:9:
      1686 │ function PtsMgr({ pts, onChange }: { pts: string[]; onChange: (v...
           ╵          ~~~~~~

  The symbol "PtsMgr" was originally declared here:

    src/app/App.tsx:646:9:
      646 │ function PtsMgr({ pts, onChange }: { pts: string[]; onChange: (v:...
          ╵          ~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "AddTopBtn" has already been declared

    src/app/App.tsx:1702:9:
      1702 │ function AddTopBtn({ label, onClick }: { label: string; onClick:...
           ╵          ~~~~~~~~~

  The symbol "AddTopBtn" was originally declared here:

    src/app/App.tsx:662:9:
      662 │ function AddTopBtn({ label, onClick }: { label: string; onClick: ...
          ╵          ~~~~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "AdminHeroPhoto" has already been declared

    src/app/App.tsx:1712:9:
      1712 │ function AdminHeroPhoto({ heroPhoto, onSave }: { heroPhoto: stri...
           ╵          ~~~~~~~~~~~~~~

  The symbol "AdminHeroPhoto" was originally declared here:

    src/app/App.tsx:672:9:
      672 │ function AdminHeroPhoto({ heroPhoto, onSave }: { heroPhoto: strin...
          ╵          ~~~~~~~~~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "AdminShowcases" has already been declared

    src/app/App.tsx:1757:9:
      1757 │ function AdminShowcases({ showcases, onSave }: { showcases: Show...
           ╵          ~~~~~~~~~~~~~~

  The symbol "AdminShowcases" was originally declared here:

    src/app/App.tsx:717:9:
      717 │ function AdminShowcases({ showcases, onSave }: { showcases: Showc...
          ╵          ~~~~~~~~~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "AdminProjects" has already been declared

    src/app/App.tsx:1853:9:
      1853 │ function AdminProjects({ projects, onSave }: { projects: Project...
           ╵          ~~~~~~~~~~~~~

  The symbol "AdminProjects" was originally declared here:

    src/app/App.tsx:813:9:
      813 │ function AdminProjects({ projects, onSave }: { projects: Project[...
          ╵          ~~~~~~~~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "AdminExperience" has already been declared

    src/app/App.tsx:1908:9:
      1908 │ function AdminExperience({ items, onSave }: { items: Experience[...
           ╵          ~~~~~~~~~~~~~~~

  The symbol "AdminExperience" was originally declared here:

    src/app/App.tsx:868:9:
      868 │ function AdminExperience({ items, onSave }: { items: Experience[]...
          ╵          ~~~~~~~~~~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "AdminEducation" has already been declared

    src/app/App.tsx:1928:9:
      1928 │ function AdminEducation({ items, onSave }: { items: Education[];...
           ╵          ~~~~~~~~~~~~~~

  The symbol "AdminEducation" was originally declared here:

    src/app/App.tsx:888:9:
      888 │ function AdminEducation({ items, onSave }: { items: Education[]; ...
          ╵          ~~~~~~~~~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "AdminAchievements" has already been declared

    src/app/App.tsx:1943:9:
      1943 │ function AdminAchievements({ items, onSave }: { items: Achieveme...
           ╵          ~~~~~~~~~~~~~~~~~

  The symbol "AdminAchievements" was originally declared here:

    src/app/App.tsx:903:9:
      903 │ function AdminAchievements({ items, onSave }: { items: Achievemen...
          ╵          ~~~~~~~~~~~~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "AdminOrgs" has already been declared

    src/app/App.tsx:1958:9:
      1958 │ function AdminOrgs({ items, onSave }: { items: Organization[]; o...
           ╵          ~~~~~~~~~

  The symbol "AdminOrgs" was originally declared here:

    src/app/App.tsx:918:9:
      918 │ function AdminOrgs({ items, onSave }: { items: Organization[]; on...
          ╵          ~~~~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "AdminSkills" has already been declared

    src/app/App.tsx:1973:9:
      1973 │ function AdminSkills({ items, onSave }: { items: Skill[]; onSave...
           ╵          ~~~~~~~~~~~

  The symbol "AdminSkills" was originally declared here:

    src/app/App.tsx:933:9:
      933 │ function AdminSkills({ items, onSave }: { items: Skill[]; onSave:...
          ╵          ~~~~~~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] The symbol "AdminPanel" has already been declared

    src/app/App.tsx:1997:9:
      1997 │ function AdminPanel({ projects, onSaveProjects, cv, onSaveCV, sh...
           ╵          ~~~~~~~~~~

  The symbol "AdminPanel" was originally declared here:

    src/app/App.tsx:957:9:
      957 │ function AdminPanel({ projects, onSaveProjects, cv, onSaveCV, sho...
          ╵          ~~~~~~~~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


X [ERROR] Multiple exports with the same name "default"

    src/app/App.tsx:2035:7:
      2035 │ export default function App() {
           ╵        ~~~~~~~

  The name "default" was originally exported here:

    src/app/App.tsx:995:7:
      995 │ export default function App() {
          ╵        ~~~~~~~


X [ERROR] The symbol "App" has already been declared

    src/app/App.tsx:2035:24:
      2035 │ export default function App() {
           ╵                         ~~~

  The symbol "App" was originally declared here:

    src/app/App.tsx:995:24:
      995 │ export default function App() {
          ╵                         ~~~

  Duplicate top-level function declarations are not allowed in an ECMAScript module. This file is considered to be an ECMAScript module because of the "export" keyword here:

    src/app/App.tsx:2035:0:
      2035 │ export default function App() {
           ╵ ~~~~~~


    at failureErrorWithLog (D:\website portfolio\node_modules\esbuild\lib\main.js:1467:15)
    at D:\website portfolio\node_modules\esbuild\lib\main.js:926:25
    at runOnEndCallbacks (D:\website portfolio\node_modules\esbuild\lib\main.js:1307:45)
    at buildResponseToResult (D:\website portfolio\node_modules\esbuild\lib\main.js:924:7)
    at D:\website portfolio\node_modules\esbuild\lib\main.js:936:9
    at new Promise (<anonymous>)
    at requestCallbacks.on-end (D:\website portfolio\node_modules\esbuild\lib\main.js:935:54)
    at handleRequest (D:\website portfolio\node_modules\esbuild\lib\main.js:628:17)
    at handleIncomingPacket (D:\website portfolio\node_modules\esbuild\lib\main.js:653:7)
    at Socket.readFromStdout (D:\website portfolio\node_modules\esbuild\lib\main.js:581:7)