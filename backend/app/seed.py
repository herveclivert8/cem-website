import asyncio

from app.core.security import hash_password
from app.db.session import AsyncSessionLocal
from app.models.call import CallForParticipation
from app.models.idea import IdeaPost
from app.models.project import Project
from app.models.publication import Publication, PublicationFormat
from app.models.tag import Tag
from app.models.user import User, UserRole


async def seed() -> None:
    async with AsyncSessionLocal() as db:
        users = [
            User(
                email="fanja@cem.mg",
                hashed_password=hash_password("password123"),
                full_name="Fanja Rasoanaivo",
                role=UserRole.CONTRIBUTOR,
            ),
            User(
                email="tojo@cem.mg",
                hashed_password=hash_password("password123"),
                full_name="Tojo Andriamanga",
                role=UserRole.CONTRIBUTOR,
            ),
            User(
                email="admin@cem.mg",
                hashed_password=hash_password("password123"),
                full_name="Admin CEM",
                role=UserRole.ADMIN,
            ),
        ]
        db.add_all(users)
        await db.flush()

        tags = {name: Tag(name=name) for name in ["Agroécologie", "Formation", "Eau & Assainissement", "Santé", "Éducation"]}
        db.add_all(tags.values())
        await db.flush()

        projects = [
            Project(
                title="Irrigation Durable - Village d'Ambohimanga",
                title_en="Sustainable Irrigation - Ambohimanga Village",
                description="Mise en place d'un système d'irrigation goutte-à-goutte pour améliorer le rendement agricole local.",
                description_en="Deployment of a drip irrigation system to improve local agricultural yield.",
                image_url="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600",
                zone_geo="Ambohimanga",
                owner_id=users[0].id,
                tags=[tags["Agroécologie"], tags["Formation"]],
                contributors=[users[0], users[1]],
            ),
            Project(
                title="Filtres à Eau Communautaires - Toliara",
                title_en="Community Water Filters - Toliara",
                description="Installation de filtres à eau potable dans les écoles et centres de santé de Toliara.",
                description_en="Installation of drinking water filters in schools and health centers in Toliara.",
                image_url="https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600",
                zone_geo="Toliara",
                owner_id=users[1].id,
                tags=[tags["Eau & Assainissement"], tags["Santé"]],
                contributors=[users[1]],
            ),
            Project(
                title="Jardins Communautaires - Antsirabe",
                title_en="Community Gardens - Antsirabe",
                description="Création de jardins partagés pour renforcer la sécurité alimentaire locale.",
                description_en="Creation of shared gardens to strengthen local food security.",
                image_url="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600",
                zone_geo="Antsirabe",
                owner_id=users[0].id,
                tags=[tags["Agroécologie"]],
                contributors=[users[0], users[1], users[2]],
            ),
            Project(
                title="Alphabétisation des Adultes - Fianarantsoa",
                title_en="Adult Literacy Program - Fianarantsoa",
                description="Programme de formation à la lecture et à l'écriture pour les adultes de la région.",
                description_en="Reading and writing training program for adults in the region.",
                image_url="https://images.unsplash.com/photo-1544717305-2782549b5136?w=600",
                zone_geo="Fianarantsoa",
                owner_id=users[2].id,
                tags=[tags["Éducation"], tags["Formation"]],
                contributors=[users[2]],
            ),
            Project(
                title="Sensibilisation Sanitaire - Mahajanga",
                title_en="Health Awareness Campaign - Mahajanga",
                description="Campagne de sensibilisation à l'hygiène et à la prévention sanitaire en milieu rural.",
                description_en="Hygiene and health prevention awareness campaign in rural areas.",
                image_url="https://images.unsplash.com/photo-1584515933487-779824d29309?w=600",
                zone_geo="Mahajanga",
                owner_id=users[1].id,
                tags=[tags["Santé"]],
                contributors=[users[0], users[1]],
            ),
        ]
        db.add_all(projects)

        publications = [
            Publication(
                title="Analyse de l'Impact Économique Local des Projets d'Irrigation",
                title_en="Local Economic Impact Analysis of Irrigation Projects",
                description="Étude sur les retombées économiques des systèmes d'irrigation communautaires.",
                description_en="Study on the economic benefits of community irrigation systems.",
                thumbnail_url="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400",
                format=PublicationFormat.PDF,
                contributors=[users[0]],
            ),
            Publication(
                title="Thèse sur la Résilience Communautaire à Madagascar",
                title_en="Thesis on Community Resilience in Madagascar",
                description="Recherche académique sur les stratégies d'adaptation des communautés rurales.",
                description_en="Academic research on adaptation strategies of rural communities.",
                thumbnail_url="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
                format=PublicationFormat.RAPPORT,
                contributors=[users[1], users[2]],
            ),
            Publication(
                title="Rapport Annuel d'Activités 2025",
                title_en="2025 Annual Activity Report",
                description="Bilan des projets et actions menées par le Club Excellence Madagascar en 2025.",
                description_en="Overview of projects and actions carried out by Club Excellence Madagascar in 2025.",
                thumbnail_url="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
                format=PublicationFormat.RAPPORT,
                contributors=[users[2]],
            ),
            Publication(
                title="Guide Pratique de l'Agroécologie en Zone Tropicale",
                title_en="Practical Guide to Agroecology in Tropical Areas",
                description="Manuel destiné aux formateurs locaux sur les techniques agroécologiques.",
                description_en="Handbook for local trainers on agroecological techniques.",
                thumbnail_url="https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?w=400",
                format=PublicationFormat.PDF,
                contributors=[users[0], users[1]],
            ),
            Publication(
                title="Étude de Faisabilité - Accès à l'Eau Potable",
                title_en="Feasibility Study - Access to Drinking Water",
                description="Analyse technique et financière pour l'extension des filtres à eau.",
                description_en="Technical and financial analysis for the expansion of water filters.",
                thumbnail_url="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400",
                format=PublicationFormat.PDF,
                contributors=[users[1]],
            ),
        ]
        db.add_all(publications)
        await db.flush()

        calls = [
            CallForParticipation(
                project_id=projects[0].id,
                text="Besoin actuel de volontaires ayant une expertise en irrigation agricole.",
                text_en="Currently seeking volunteers with expertise in agricultural irrigation.",
            ),
            CallForParticipation(
                project_id=projects[1].id,
                text="Recherche de solutions techniques pour l'entretien des filtres à eau.",
                text_en="Looking for technical solutions for water filter maintenance.",
            ),
            CallForParticipation(
                project_id=projects[3].id,
                text="Appel à volontaires pour l'animation d'ateliers d'alphabétisation.",
                text_en="Call for volunteers to facilitate literacy workshops.",
            ),
        ]
        db.add_all(calls)

        ideas = [
            IdeaPost(author_id=users[0].id, content="Et si on organisait un atelier commun entre les projets d'Ambohimanga et d'Antsirabe ?"),
            IdeaPost(author_id=users[1].id, content="Je propose un système d'échange de compétences entre bénévoles des différentes régions."),
            IdeaPost(author_id=users[2].id, content="Réflexion en cours sur un partenariat local pour renforcer l'engagement des jeunes."),
        ]
        db.add_all(ideas)

        await db.commit()
        print("Seed terminé avec succès.")


if __name__ == "__main__":
    asyncio.run(seed())
