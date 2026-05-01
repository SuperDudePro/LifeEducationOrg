import type { LifeEducationPost } from "../../postTypes";
import whyHero from "./images/why-section-hero.jpg";
import whySocial from "./images/why-section-social.jpg";
import navigationImage from "./images/real-world-navigation-inline.jpg";
import { PostFigure } from "../../../components/PostFigure";

const post: LifeEducationPost = {
  slug: "why-section-is-live",
  title: "The Why Section Is Live",
  excerpt:
    "The Why section is now live on LifeEducation.org. It is not the whole system and not another document dump. It is the front door: the reason LifeEducation starts with real-world capability instead of school performance.",
  publishedAt: "2026-04-29",
  displayDate: "April 2026",
  status: "Recent",
  topic: "LifeEducation Updates",
  tags: ["LifeEducation", "The Why", "The Floor", "Capability", "Parenting"],
  heroImage: whyHero,
  heroAlt:
    "A young person stands at a marked threshold facing a road toward a city, transit hub, and open landscape, symbolizing the start of adult capability.",
  cardImage: whySocial,
  cardAlt:
    "A young person stands at the edge of a path facing a city, transit hub, and open road.",
  body: (
    <>
      <p>
        Most education arguments start too late.
      </p>
      <p>
        They start with school choice, curriculum, grades, college, test scores, learning styles, screen time, homework, standards, or whatever fight happens to be loudest that week.
      </p>
      <p>
        Those things matter. Some of them matter a lot.
      </p>
      <p>
        But they are not the starting point.
      </p>
      <p>
        The better starting point is simpler:
      </p>
      <p>
        <strong>What should an 18-year-old actually be able to do?</strong>
      </p>
      <p>
        That question is now the center of the Why section on LifeEducation.org.
      </p>
      <p>
        I have been building LifeEducation around that question for a while, but the project needed a clearer front door. Not another explanation of every layer. Not a giant document dump. Not a manifesto that tries to answer every possible objection before anyone has even walked in.
      </p>
      <p>
        Just the reason the project exists.
      </p>
      <p>
        The Why section is that front door.
      </p>
      <p>
        It explains the target: raising capable, self-directed humans who can function in the real world without needing to be managed like children in adult-sized bodies.
      </p>
      <p>
        That does not mean rejecting school. It does not mean pretending every family should homeschool. It does not mean building a rigid curriculum and calling it freedom.
      </p>
      <p>
        The point is different.
      </p>
      <p>
        LifeEducation treats the learning environment as changeable. School, homeschool, travel, hybrid, tutors, projects, work, books, community, and online tools are environments. They can help. They can fail. They can change.
      </p>
      <p>
        The operating system underneath has to be stronger than any one environment.
      </p>
      <PostFigure
        src={navigationImage}
        alt="A young person uses a public travel kiosk while a phone shows navigation, symbolizing real-world problem solving and system navigation."
        caption="The environment can change. The target should not."
      />
      <p>
        A kid can be school-successful and still not be ready for life. A kid can collect credentials and still freeze when nobody tells them what to do next. A kid can look impressive on paper and still lack judgment, agency, resilience, practical competence, or the ability to navigate real systems.
      </p>
      <p>
        That gap is where LifeEducation starts.
      </p>
      <p>
        The Why section lays out the basic thesis: the goal is not compliance, polish, or institutional approval. The goal is real capability, autonomy, judgment, health, belonging, optionality, and integrity built over time, tested in real life, and transferred gradually from parent to child.
      </p>

      <h2>Why the Why comes first</h2>
      <p>
        LifeEducation separates the Why from the Floor and the Domains on purpose.
      </p>
      <p>
        The Why names the target.
      </p>
      <p>
        The Floor defines the minimum.
      </p>
      <p>
        The Domains keep the full map of human competence in view.
      </p>
      <p>
        Those pieces are related, but they are not the same thing. Keeping them separate matters. Otherwise, the whole thing starts to look like a giant checklist or a homeschool binder with better branding.
      </p>
      <p>
        That is not what I am building.
      </p>
      <p>
        The Why is the answer to the question, “What are we actually optimizing for?”
      </p>
      <p>
        That question has to come first.
      </p>

      <h2>A clearer target</h2>
      <p>
        Without a clear target, education becomes a pile of activities. Classes, lessons, sports, apps, books, chores, trips, projects, grades, habits, and enrichment all compete for attention. Some are useful. Some are noise. Some are only useful if they serve a real aim.
      </p>
      <p>
        The Why section is my attempt to name the target clearly enough that the rest of the system can be judged against it.
      </p>
      <p>
        Does this build agency?
      </p>
      <p>
        Does this build capability?
      </p>
      <p>
        Does this preserve optionality?
      </p>
      <p>
        Does this strengthen integrity?
      </p>
      <p>
        Does this support health?
      </p>
      <p>
        Does this deepen belonging?
      </p>
      <p>
        Those are better questions than “Does this look like school?” or “Will this impress someone?”
      </p>
      <p>
        The section is live now because the project needed a public anchor. The rest of LifeEducation can keep developing, but the basic standard should be visible: by 18, the goal is not a kid who has merely completed childhood. The goal is a young adult who can begin owning a life.
      </p>
      <p>
        Not perfectly.
      </p>
      <p>
        Not dramatically.
      </p>
      <p>
        Not as a finished product.
      </p>
      <p>
        Just for real.
      </p>
      <p>
        <a className="why-button" href="/why">Read the Why section</a>
      </p>
      <p>
        More pieces are coming. The Floor and the Domains are the next major layers, but the Why comes first.
      </p>
      <p>
        Because if the target is wrong, the system does not matter.
      </p>
    </>
  ),
};

export default post;
