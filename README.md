# 🐾 PetCare Connect  – Fullstack Angular & Spring Boot

PetCare est une application fullstack démontrant une connexion Frontend ↔ Backend avec **Angular (standalone + Tailwind CSS)** et **Spring Boot (Java 21)**.

Cette application est destinée aux propriétaires d’animaux et aux professionnels.
Elle permettra à terme de gérer :

- le profil et l’historique de santé des animaux

- les rendez-vous et suivis vétérinaires

- les rappels de soins et vaccinations

Le projet sert également de support d’apprentissage autour des bonnes pratiques :

- architecture propre & évolutive

- Angular moderne (2025)

- Spring Boot orienté API REST
---

## Architecture du projet
```text
petcare/
├── petcare-api/   # Backend Spring Boot (API REST)
└── petcare-web/   # Frontend Angular 21 + Tailwind
```
---

## Technologies utilisées

#### Backend

- Java 21

- Spring Boot 3

- Spring Web / Security

- API REST

#### Frontend

- Angular 21 (standalone components)

- TailwindCSS

- RxJS + async pipe

- Proxy Angular → API backend
---

## Installation
Cloner le projet
```bash
git clone https://github.com/jordanDev34/petcare.git
cd petcare
```

#### ▶️ Lancer le backend (Spring Boot)
```bash
cd petcare-api
mvn spring-boot:run
```
API disponible sur :
http://localhost:8080

Test health-check :
```bash
GET /api/health
```

#### ▶️ Lancer le frontend (Angular)
```bash
cd petcare-web
npm install
npm start
```

Application disponible sur :
http://localhost:4200 <br>
Le proxy redirige les appels /api/* vers localhost:8080

---

## État actuel du projet

- ✔ Base du projet mise en place
- ✔ Communication Front ↔ Back opérationnelle
- ✔ Page de test de connectivité avec affichage d’état API
- ✔ Stack prête pour évolution fonctionnelle

## Prochaines étapes

- Authentification & rôles utilisateur

- Gestion des profils animaux

- Architecture métier modulaire