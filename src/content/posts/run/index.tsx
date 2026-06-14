import type { LifeEducationPost } from "../../postTypes";
import { PostFigure } from "../../../components/PostFigure";
import bodyImageOne from "./images/body-image-1.webp";
import bodyImageTwo from "./images/body-image-2.webp";
import bodyImageThree from "./images/body-image-3.webp";
import bodyImageFour from "./images/body-image-4.webp";
import { metadata } from "./meta";

type PostBlock =
  | { type: "paragraph"; text: string }
  | { type: "figure"; image: string; alt: string };

const postBlocks: PostBlock[] = [
  {
    type: "paragraph",
    text: "Life Education is a refusal.",
  },
  {
    type: "paragraph",
    text: "My children's lives are too valuable, and the years I have left are too valuable, to hand them an inferior product when the magnificence of the world sits right there as the alternative.",
  },
  {
    type: "paragraph",
    text: "That's the whole thing. Everything else is logistics.",
  },
  {
    type: "paragraph",
    text: "But isn't that the same answer regardless of how old I was? It was true with my first set of kids. It still works that way. The truth never changed. What changed is that I'm finally old enough, and close enough to the end, to act on it. I can do it now only because I'm broke, nearly retired, and willing to slow-travel the country and the world on almost nothing. The decision was always right. I just couldn't afford to be right until now.",
  },
  {
    type: "paragraph",
    text: "Once you see something true, you can't unsee it.",
  },
  {
    type: "paragraph",
    text: "I'm not naive, and I'm not an outsider throwing rocks. I've been inside this system since the 1970s. I work in it right now. I know its challenges from inside the building, not from a think tank.",
  },
  {
    type: "paragraph",
    text: "So let me give you my credential, and let me be careful with it, because I work with extraordinary people and I won't pretend otherwise. The school where I work sits right around the state average on the SAT, the test we actually use. A little below it, if I'm honest, especially in math. Not failing. Average, or close enough. And here's the quiet part: average is camouflage. An average school gets left alone. Nobody comes for you. The pressure, the audits, the turnaround plans all get aimed at the schools below the line, while the merely average are handed vague instructions to become more uniform with everyone else.",
  },
  {
    type: "paragraph",
    text: "More uniform with whom? With a district that ranks near the bottom of the entire state. The district handing down the orders to conform is itself one of the lowest-performing in Colorado. Sit in that. We're told to align with a system that hasn't shown it can teach the children already in its care.",
  },
  {
    type: "paragraph",
    text: "Every single year I've been in education, somebody has rolled out a new idiocy and called it transformation. A new program. A new arrangement of the posters on the wall. A slogan to open the morning with. A new choreography for moving bodies through the hallways. Most of that isn't even live for us this year. But none of it would surprise me, because it never stops, and not one piece of it has ever touched the thing that's actually broken.",
  },
  {
    type: "paragraph",
    text: "The system cannot be reformed. I don't say that as despair. I say it as arithmetic. Reforming what we have would take so long, and would demand so many good decisions stacked one on the next, board meeting after board meeting, year after year, without a single failure of nerve, that anyone who's watched a board of education operate, or worked one honest day inside a school, knows it's a fantasy. From first principles, this system is incapable of saving itself. Which means it's incapable of saving the people it was built to serve.",
  },
  {
    type: "figure",
    image: bodyImageOne,
    alt: "A maze of gray classroom walls dissolving into a bright open road through green countryside.",
  },
  {
    type: "paragraph",
    text: "What will we do with that?",
  },
  {
    type: "paragraph",
    text: "If your child has the temperament, the resources, and the inclination, school might be going great. Some kids thrive in it, and I'm glad for them. But for most of us it isn't going great, we feel trapped, and we've been trained to call the trap normal. My honest estimate is that the system is failing at least seventy percent of the students in this country. And I mean failing in the real sense, which has to count the strong ones too. The kids who show up, do every assignment, put the work in, and still walk out the far end with a flat, middling result they were told to be proud of. Count them, and seventy percent is generous. Saying that out loud in education circles is close to heresy. I don't know how you say anything else and still claim to be looking at it straight.",
  },
  {
    type: "paragraph",
    text: "So if it isn't a curriculum, what is it? Most thinking about education starts with the institution and asks how to make it better. Life Education starts from the other end. It asks what a free, capable adult actually needs to be able to do, then works backward. Ten domains. A floor underneath them. A plain definition of what a capable eighteen-year-old can do, one that holds no matter where the learning happens: in a public school, at a kitchen table, or on the road.",
  },
  {
    type: "paragraph",
    text: "It doesn't tell you to leave anything. It tells you what done looks like, so you can measure any setup, including the one you're already in, against reality instead of against a syllabus.",
  },
  {
    type: "figure",
    image: bodyImageThree,
    alt: "A school desk with test sheets, a map, and a compass beside an open doorway to a winding road.",
  },
  {
    type: "paragraph",
    text: "And the thing I most want to say to the kids and parents I meet is the thing I'm least permitted to say: run. Go figure out what you actually want from this world. Then come back, and I'll tell you how to get it.",
  },
  {
    type: "figure",
    image: bodyImageTwo,
    alt: "A child with a backpack running out of a weathered classroom toward a long road and open mountains.",
  },
  {
    type: "paragraph",
    text: "I have maybe seven years left. Five with a miracle, maybe fewer. I'm going to spend them taking the class I built and shaping it into a model of a direction we could move. I have no illusions about the scale of it. At its best it's one lit room inside a system that's been dying by inches since before I walked into it as a child in the 1970s. I'm not going to fix the system. I'm going to get my own children out, and leave a map for anyone who wants to follow.",
  },
  {
    type: "paragraph",
    text: "This is my answer to a system I no longer trust to raise my children, built so any parent can use it, whether you stay, you leave, or you split the difference.",
  },
  {
    type: "figure",
    image: bodyImageFour,
    alt: "An adult and two children with backpacks walking away from a distant school building toward open country.",
  },
  {
    type: "paragraph",
    text: "Which leaves the one question I can't stop turning over.",
  },
  {
    type: "paragraph",
    text: "We've had pockets of real success in this country, schools and programs that genuinely worked. Almost none of them proved replicable, let alone scalable. The system loves to point at that. It treats the failure to scale as proof that nothing better is possible, that the good small things are flukes, that we should all get back in line.",
  },
  {
    type: "paragraph",
    text: "But look at who's holding the measuring stick. Success, here, means whatever the system has decided to count. The same people who can't teach the children in front of them get to define what working looks like, and then they swing that definition at everyone else.",
  },
  {
    type: "paragraph",
    text: "So maybe those pockets don't replicate because of something rotten in the system itself. Or maybe, and this is the one that keeps me up at night, the thing the system calls success, the thing it orders all of us to reproduce, was never real to begin with. The good things don't scale because they aren't what's being scaled. What scales so easily, decade after decade, is the fantasy.",
  },
  {
    type: "paragraph",
    text: "I have a theory. That's the next one.",
  },
];

const postBody = (
  <>
    {postBlocks.map((block, index) => {
      if (block.type === "figure") {
        return <PostFigure key={`figure-${index}`} src={block.image} alt={block.alt} />;
      }

      return <p key={`paragraph-${index}`}>{block.text}</p>;
    })}
  </>
);

const post: LifeEducationPost = {
  ...metadata,
  body: postBody,
};

export default post;
