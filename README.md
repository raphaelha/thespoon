# 🥄 The Spoon – MVP

**The Spoon**, c’est le **MPG des restos** : un classement local, fun et communautaire des restaurants de ta ville.  
Vote pour tes restos préférés avec ta bande de potes, ta boîte ou ton asso, et découvre le **top 10** global ou par communauté.

---

## 🎯 Objectif

Créer un classement **simple, communautaire et social** des restos :  
- Authentification réelle (email)  
- Des communautés privées ou publiques via un simple lien  
- Des votes pour faire émerger les bons restos… selon toi

---

## 🚀 Fonctionnalités MVP

- ✅ Authentification par email (magic link ou code)
- ✅ Création de communauté (nom + code)
- ✅ Ajout de restaurants (nom, ville, optionnel : adresse)
- ✅ Vote pour un resto (1 par user x resto x communauté)
- ✅ Leaderboard global et par communauté
- ✅ Fiches resto (nom, ville, nb de votes, votants)
- ✅ Tableau de bord utilisateur (mes votes, mes communautés)

---

## 🧱 Stack technique

- **Framework** : Next.js 14 (App Router)
- **ORM** : Prisma
- **DB** : SQLite (dev) / PostgreSQL (prod-ready)
- **CSS** : TailwindCSS (mobile-first)
- **Déploiement** : Vercel
- **Auth** : NextAuth (email provider - magic link)

---

## 📐 Modèle de données (Prisma)

- `User` : email unique, nom
- `Restaurant` : nom, ville, votes, créé par un user
- `Community` : code d’accès, nom
- `Vote` : 1 vote par user x resto x communauté
- `UserCommunity` : lien user ↔ communauté

Voir `prisma/schema.prisma` pour les détails.

---

