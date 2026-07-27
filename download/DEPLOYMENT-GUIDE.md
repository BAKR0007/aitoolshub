# =====================================================================
# AIToolsHub — دليل النشر الكامل على GitHub + Hostinger
# =====================================================================

## نظرة عامة

المشروع جاهز للنشر على:
- المسار: https://bakrr.net/AIToolsHub/
- المنصة: Hostinger Business (مع Node.js)
- الـ basePath مُعد في next.config.ts إلى `/AIToolsHub`

---

## الجزء 1: رفع المشروع إلى GitHub (PowerShell)

### المتطلبات المسبقة
1. ثبّت Git من https://git-scm.com/download/win
2. ثبّت GitHub CLI (اختياري لكن يسهل الموضوع): https://cli.github.com
3. أنشئ حساب على GitHub إن لم يكن لديك

### الخطوة 1: فتح PowerShell في مجلد المشروع

```powershell
# افترض أن المشروع على المسار التالي (عدّله حسب حالتك)
cd C:\Users\YourName\Documents\aitoolshub

# لو المشروع على Desktop:
# cd $env:USERPROFILE\Desktop\aitoolshub
```

### الخطوة 2: تهيئة Git وإعداد الهوية (مرة واحدة فقط)

```powershell
# إعداد اسمك وبريدك (لو لم تفعله من قبل)
git config --global user.name "اسمك الكامل"
git config --global user.email "your.email@example.com"

# تهيئة مستودع Git جديد في المجلد
git init
git branch -M main
```

### الخطوة 3: التحقق من ملف .gitignore

تأكد أن ملف `.gitignore` يحتوي على الأقل:

```gitignore
node_modules
.next
.env
db/custom.db
*.log
```

(هذا الملف موجود بالفعل في المشروع وجاهز)

### الخطوة 4: إضافة الملفات وأول commit

```powershell
# إضافة كل الملفات (ما عدا الموجودة في .gitignore)
git add .

# عرض ما سيتم رفعه (للمراجعة)
git status

# أول commit
git commit -m "Initial commit: AIToolsHub SaaS platform

- Next.js 16 + React 19 + TypeScript + Tailwind CSS 4
- 5-locale i18n (EN/AR/ES/ZH/HI) with RTL support
- 12 AI tools seeded, 12 categories, 38 tags
- User dashboard, Admin dashboard, Compare, Pricing, API
- Configured for Hostinger deployment at /AIToolsHub subpath"
```

### الخطوة 5: إنشاء مستودع على GitHub

**الطريقة A: من المتصفح**
1. اذهب إلى https://github.com/new
2. اسم المستودع: `aitoolshub`
3. الوصف: `Enterprise AI Tools Directory SaaS`
4. اختر **Private** أو **Public**
5. ❌ لا تختر "Add a README" ولا ".gitignore" ولا "license" (المشروع يحتويها)
6. اضغط **Create repository**

**الطريقة B: عبر GitHub CLI (أسرع)**
```powershell
# سجّل الدخول أولاً (سيفتح المتصفح)
gh auth login

# أنشئ المستودع
gh repo create aitoolshub --public --source=. --remote=origin --description "Enterprise AI Tools Directory SaaS"
```

### الخطوة 6: ربط المشروع بـ GitHub (لو استخدمت الطريقة A)

```powershell
# استبدل YOUR_USERNAME باسم المستخدم على GitHub
git remote add origin https://github.com/YOUR_USERNAME/aitoolshub.git

# التحقق من الإعداد
git remote -v
```

### الخطوة 7: رفع الكود إلى GitHub

```powershell
# رفع الكود (قد يطلب اسم المستخدم وكلمة المرور/PAT)
git push -u origin main
```

**ملاحظة عن كلمة المرور**: GitHub لا يقبل كلمة مرور حسابك العادية في الـ push.
تحتاج **Personal Access Token (PAT)**:
1. اذهب إلى https://github.com/settings/tokens
2. Generate new token (classic) → اختر صلاحية `repo`
3. انسخ الـ token
4. عند طلب كلمة المرور في PowerShell، الصق الـ token بدلاً منها

أو استخدم **GitHub CLI** الذي يتعامل مع المصادقة تلقائياً:
```powershell
gh auth login
# ثم أعد الـ push
git push -u origin main
```

### الخطوة 8: التحقق من الرفع

افتح المتصفح على: `https://github.com/YOUR_USERNAME/aitoolshub`

سترى كل ملفات المشروع. ✓

---

## الجزء 2: النشر على Hostinger

### الخطوة 1: الدخول إلى hPanel

1. اذهب إلى https://hpanel.hostinger.com
2. سجّل الدخول بحسابك
3. اضغط على ** Websites **
4. اضغط **Manage** بجانب `bakrr.net`

### الخطوة 2: تفعيل Node.js

**الطريقة الموصى بها: Web Apps (نشر تلقائي من GitHub)**

1. في القائمة اليسرى، ابحث عن **Website** → **Web Apps** أو **Advanced** → **Node.js**
2. اضغط **Create Node.js App** أو **Connect Git**

### الخطوة 3: إعداد الـ App

املأ النموذج بالقيم التالية:

| الحقل | القيمة |
|------|--------|
| **Project name** | `aitoolshub` |
| **Node.js version** | `20.x` (أو أحدث متاح) |
| **Domain** | `bakrr.net` |
| **App directory** | `AIToolsHub` (هذا يطابق basePath) |
| **App root** | `/domains/bakrr.net/public_html/AIToolsHub` (سيُنشأ تلقائياً) |
| **Package manager** | `npm` |
| **Build command** | `npm install && npm run build` |
| **Start command** | `npm start` |
| **Environment variables** | (انظر الجدول التالي) |

### الخطوة 4: متغيرات البيئة (Environment Variables)

أضف هذه المتغيرات في قسم Environment variables:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `3000` (أو البورت الذي يحدده Hostinger) |
| `DATABASE_URL` | `file:./db/custom.db` (للبدء، يمكن تغييره لاحقاً إلى PostgreSQL) |
| `NEXT_PUBLIC_APP_URL` | `https://bakrr.net/AIToolsHub` |

### الخطوة 5: ربط GitHub

1. اضغط **Connect Git** أو **Link GitHub**
2. سجّل الدخول بحساب GitHub
3. اختر المستودع `aitoolshub`
4. اختر الفرع `main`
5. فعّل **Auto-deploy on push** (كل ما دفعت كود جديد يُعاد النشر تلقائياً)

### الخطوة 6: النشر الأول (First Deploy)

1. اضغط **Deploy** أو **Save & Deploy**
2. انتظر 3-5 دقائق (سيتم تشغيل `npm install` و `npm run build`)
3. راقب الـ logs في نفس الصفحة

### الخطوة 7: إعداد Reverse Proxy (إن لزم)

بعض خطط Hostinger تستخدم Apache بدلاً من Node.js مباشرة. لو ظهر لك خطأ 403 أو 404 بعد النشر، أنشئ ملف `.htaccess` في `public_html/AIToolsHub/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule ^$ http://127.0.0.1:3000/AIToolsHub/ [P,L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ http://127.0.0.1:3000/AIToolsHub/$1 [P,L]
</IfModule>
```

**لكن**: إذا كان Hostinger يستخدم Phusion Passenger (وهو الغالب)، لا تحتاج `.htaccess` — فقط تأكد أن `package.json` يحتوي على `"start": "next start -p 3000"` (وهو موجود).

### الخطوة 8: اختبار الموقع

افتح المتصفح على: **https://bakrr.net/AIToolsHub/**

يجب أن ترى الصفحة الرئيسية كاملة. ✓

---

## الجزء 3: حل المشاكل الشائعة

### مشكلة: 403 Forbidden
**السبب**: ملفات المشروع في `public_html/AIToolsHub/` لكن Apache لا يعرف كيف يخدمها.

**الحل**:
1. تأكد أن Node.js app يعمل (hPanel → Node.js → Status: Running)
2. لو ما يعمل، اضغط **Restart**
3. لو ما زال 403، أضف `.htaccess` كما في الخطوة 7

### مشكلة: 404 Not Found
**السبب**: الـ basePath غير متطابق.

**الحل**:
- لو الوصول من `https://bakrr.net/AIToolsHub/` → يجب أن `basePath: "/AIToolsHub"` في next.config.ts (✓ موجود)
- لو الوصول من `https://bakrr.net/` (الجذر) → احذف `basePath` و `assetPrefix` من next.config.ts

### مشكلة: 500 Internal Server Error
**السبب**: غالباً مشكلة في البناء (build errors).

**الحل**:
1. راجع deploy logs في hPanel
2. شغّل محلياً `npm run build` للتأكد من عدم وجود أخطاء
3. لو الخطأ `Cannot find module 'X'` → أضف `npm install X` في build command

### مشكلة: الصور لا تظهر
**السبب**: الصور من dicebear.com قد تكون محجوبة، أو الـ assetPrefix خاطئ.

**الحل**:
- تأكد أن `next.config.ts` يحتوي على `images.unoptimized: true` (✓ موجود)
- تأكد أن `assetPrefix: "/AIToolsHub/"` (✓ موجود)

### مشكلة: قاعدة البيانات
المشروع يستخدم SQLite (ملف محلي). هذا يعمل على Hostinger لكن:
- البيانات قد تُفقد إذا أعيد نشر المشروع (لو الـ db/ ليس في .gitignore)
- الحل طويل المدى: استخدم PostgreSQL مجاني من [Neon](https://neon.tech) أو [Supabase](https://supabase.com)

**ملاحظة مهمة**: الكود الحالي لا يعتمد على قاعدة البيانات في وقت التشغيل — كل البيانات في `src/lib/data.ts`. قاعدة البيانات فقط للـ seed script. الموقع سيعمل بدون مشاكل حتى لو لم تُشغّل الـ seed.

---

## الجزء 4: أوامر PowerShell مفيدة (مرجع سريع)

### أوامر Git الأساسية

```powershell
# عرض حالة الملفات
git status

# إضافة كل التعديلات
git add .

# عمل commit
git commit -m "وصف التغيير"

# رفع التعديلات إلى GitHub
git push

# سحب آخر تحديثات من GitHub
git pull

# عرض سجل التعديلات
git log --oneline -10
```

### أوامر للتطوير المحلي

```powershell
# تثبيت الحزم
npm install

# تشغيل خادم التطوير
npm run dev

# بناء نسخة الإنتاج
npm run build

# تشغيل نسخة الإنتاج محلياً
npm start

# فحص الكود
npm run lint

# تجديد قاعدة البيانات
npm run db:push
npm run seed
```

### أوامر Git المتقدمة (عند الحاجة)

```powershell
# إلغاء آخر commit (مع الاحتفاظ بالتعديلات)
git reset --soft HEAD~1

# إلغاء كل التعديلات غير الملتزمة
git checkout -- .

# حذف فرع محلي
git branch -D branch-name

# إنشاء tag للإصدارات
git tag -a v1.0.0 -m "First production release"
git push origin v1.0.0
```

---

## الجزء 5: التحديثات المستقبلية

كل ما عليك لتحديث الموقع:

```powershell
# 1. عدّل الملفات المطلوبة في محرر الكود

# 2. اختبر محلياً
npm run dev

# 3. اعمل commit و push
git add .
git commit -m "وصف التحديث"
git push

# 4. Hostinger سيعيد النشر تلقائياً (لو فعّلت auto-deploy)
```

---

## نصائح أخيرة

1. **استخدم Private repo** لو لا تريد أن يرى أحد الكود
2. **لا ترفع `.env` أبداً** — استخدم `.env.example` كقالب
3. **فعّل 2FA على GitHub** لحماية حسابك
4. **اعمل backup لقاعدة البيانات** بانتظام (لو تستخدم PostgreSQL)
5. **راقب الاستهلاك** في Hostinger → لكل موقع حد معين من الموارد

بالتوفيق! 🚀
