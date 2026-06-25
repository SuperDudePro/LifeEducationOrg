import type { ReactNode } from "react";
import type { LifeEducationPost } from "../../postTypes";
import { PostFigure } from "../../../components/PostFigure";
import bodyImageOne from "./images/body-image-1.webp";
import bodyImageTwo from "./images/body-image-2.webp";
import bodyImageThree from "./images/body-image-3.webp";
import bodyImageFour from "./images/body-image-4.webp";
import { metadata } from "./meta";

type PostBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "figure"; image: string; alt: string; caption?: string };

const imageMap: Record<string, string> = {
  bodyImageOne,
  bodyImageTwo,
  bodyImageThree,
  bodyImageFour,
};

const postBlocks: PostBlock[] = [
  {
    "type": "paragraph",
    "text": "*The number can be real. The story the system bolts onto it is the lie — and that's why it never scales.*"
  },
  {
    "type": "paragraph",
    "text": "*This picks up where [Run](https://lifeeducation.org/posts/run) left off.*"
  },
  {
    "type": "paragraph",
    "text": "I said I had a theory. Here it is, in one sentence: you can't reproduce something that was never there."
  },
  {
    "type": "paragraph",
    "text": "For years I thought the good schools didn't spread because the system smothered them — that somewhere out there were real successes, fragile and rare, and the machine kept crushing them before they could multiply. That's the comforting version. It lets you keep believing the good thing exists and the only problem is getting it to travel."
  },
  {
    "type": "paragraph",
    "text": "I don't believe it anymore. I've been saying this out loud for a long time, to anyone who'd sit still for it, and watching it prove itself in one form or another for twenty-five years. Most of what gets called success in education isn't what it claims to be. The number is usually real. The story bolted onto it — *this school, this model, this method did that* — is the trick of the light. And the reason the success never scales isn't that the good thing is too delicate to copy. It's that the thing being copied was never the thing that worked. You're trying to mass-produce a magic trick and wondering why the rabbit keeps not being real."
  },
  {
    "type": "paragraph",
    "text": "Let me tell you how I learned the trick. I learned it from people who run it — some who had no business near a classroom, and some who were genuinely, undeniably good at the job, which turns out to be the more unsettling case."
  },
  {
    "type": "figure",
    "image": "bodyImageOne",
    "alt": "A staged school facade draped in banners about growth and success, with hidden machinery, a selective admissions gate, and a tag that says the numbers may be real but the narrative may not be.",
    "caption": "The numbers can be real. The story wrapped around them is often the trick."
  },
  {
    "type": "heading",
    "text": "The best school in Englewood"
  },
  {
    "type": "paragraph",
    "text": "Early in my career an assistant principal took me aside one day and told me something plainly, the way you hand a new guy the real rules after orientation's over. The key to a successful inner-city school, she said, is to never take anyone below the seventh decile. You can't run a successful school if your average sits lower than that. It's not possible. She wasn't being cruel about it. She was being generous — handing me the actual rule of the trade so I wouldn't waste years learning it the hard way."
  },
  {
    "type": "paragraph",
    "text": "I want to be fair to the principal she worked under, because the honest version is more complicated than the cynical one, and the complication is the whole point."
  },
  {
    "type": "paragraph",
    "text": "The school sat in Englewood, on the South Side of Chicago — one of the poorest, most violent neighborhoods in the city, a place the rest of the country only hears about in body counts. And under this principal, it was the best school in the area. Not close. Better graduation, better ACT, better attendance than anything around it. A dynamic staff she recruited herself. Honors classes, a state-championship girls' team, debate titles. Inside the district she was a star, and she'd earned it. I learned more from her in one year than from anyone else I ever worked under. I also couldn't stand her, as an educator or as a person. Both of those are true, and you have to hold them at the same time or you'll miss what actually happened."
  },
  {
    "type": "paragraph",
    "text": "Here's what made it possible, and it took me years to see clearly. That school was not a plain neighborhood school in those years. In the early 2000s it used modest admissions requirements and pulled students from across the city — not just the kids who happened to live nearby. And she had the clout to move kids out, and she used it. She didn't put up with shit. So she had a roster she could shape: select a little at the front door, ease the wrong ones out the back. Not a selective magnet, exactly — but nothing like the open neighborhood school down the block, either. She held a band in the middle that she controlled. Above her, the city's elite exam schools skimmed off the genuine top. Below her was the neighborhood floor she was allowed to decline. She built something real in the space between, partly by hand."
  },
  {
    "type": "paragraph",
    "text": "So was she good, or was it the roster? She was good, and it was the roster. Those aren't in tension — that's the point. Real talent and real roster control, braided together so tightly that nobody, looking from outside, could ever pull them apart. Which means the system never had to find out whether the talent alone would have been enough. It never wants to find out. The braid is the product."
  },
  {
    "type": "paragraph",
    "text": "And then the system ran the experiment for us, by accident, and the answer came back ugly."
  },
  {
    "type": "paragraph",
    "text": "In 2005 the district phased out the neighborhood's other big high school, redrew the attendance borders, and poured in an influx of neighborhood students the school had never been built to absorb. Around the same time, a wave of new charters opened nearby and pulled motivated families away. The admissions requirements were gone. The citywide draw was gone. The kids she once had the room to move out were now simply hers to keep. And the best school in Englewood began to die. Within a few years it was down to around ninety students and sitting on a list to be closed."
  },
  {
    "type": "paragraph",
    "text": "Now step back and watch the whole decade as one motion. A school built as a 6–12, then stripped of its middle grades, then handed back its middle grades, then stripped of them again. Borders redrawn. A neighborhood it couldn't absorb poured in. Competing charters dropped on top of it. Then phased out for the low enrollment all of that churn produced. Nobody could hold a school steady through that. The district destabilized it for ten years and then read the rubble as the school's own verdict. Hold that thought — it's bigger than this post, and I'll come back to it in the series."
  },
  {
    "type": "paragraph",
    "text": "But pull it all the way back to the simplest version and the lesson is plain: the success held exactly as long as she could shape who was in the building. The day she couldn't, it was gone. The teaching didn't leave. The selection did."
  },
  {
    "type": "heading",
    "text": "The bumps"
  },
  {
    "type": "paragraph",
    "text": "Once you see the roster, you start seeing the rest of it, and the rest of it is bumps."
  },
  {
    "type": "paragraph",
    "text": "A brand-new school gets a newness bump — fresh staff who chose to be there, families who chose it on purpose, a building nobody's tired of yet. A funded school gets a money bump — smaller classes, more bodies, more of everything, for as long as the grant lasts. A restart gets an energy bump, that fresh-paint adrenaline where everyone's exhausted in the good way and certain this time is different. A school full of opted-in families gets a self-selection bump, because the act of choosing already filters for the parents most likely to show up and push. And a school allowed to ease its hardest kids out the side door gets the biggest bump of all, the one nobody will say into a microphone."
  },
  {
    "type": "paragraph",
    "text": "Every one of those is real. You can measure it. And not one of them is teaching. Each either fades on a schedule or runs on excluding somebody. The newness wears off. The grant ends. The energy burns down to the same tired baseline as everywhere else. The selection only holds while you control the door. Strip the bumps away and you're left holding the one question the whole apparatus is built to keep you from asking: did anyone learn anything they wouldn't have learned anyway?"
  },
  {
    "type": "paragraph",
    "text": "Most of the time, nobody knows. Most of the time, nobody wants to."
  },
  {
    "type": "figure",
    "image": "bodyImageTwo",
    "alt": "A giant pair of hands measuring school performance above three schools, with the highest-scoring school filtered through entry screening, enrollment targets, and exit filters.",
    "caption": "One measure. Many systems. Unequal scales."
  },
  {
    "type": "heading",
    "text": "When you can't pick, you fake it"
  },
  {
    "type": "paragraph",
    "text": "The charters everyone points to understand this completely, and I'll give the best of them their due — they're not cheating at the front door. The celebrated Denver network admits its kids by open lottery, no admissions test, and it genuinely serves a low-income, mostly minority population. Nobody's creaming the affluent off the top. That part is real, and it's worth saying plainly before anything else."
  },
  {
    "type": "paragraph",
    "text": "But look at where the sorting actually happens. You have to apply to that lottery — navigate the choice system, fill out the form, rank the school. Families who don't do any of that default to their neighborhood school. So the filter isn't admission; it's who applies. And the engine underneath is a deliberately, relentlessly high bar — do the work or stay after, don't stay after and you don't stay — plus a real willingness to hold kids back and a special-education population that runs well below the district's. The bar is the point, and the bar is admirable. It's also a sorting mechanism. \"Hold a hard line and let attrition handle the rest\" produces those numbers only for the students who remain, and it cannot be run on the children a neighborhood school is never allowed to lose. The expectations are the real thing. The result still isn't portable."
  },
  {
    "type": "paragraph",
    "text": "You've seen the polished version too, the one that makes the news. A celebrated Colorado school announced that one hundred percent of its seniors were admitted to a four-year college — first in the state, the story went. It was a small school. Its own materials describe its students as kids who plan to go to college, who opt into the whole demanding program on purpose. So: a hundred percent of a self-selected, college-bound senior class got into college. Read that twice. The kids were real and their acceptances were real. What's fake is the sentence the system wraps around them — that a method did this, that here is a thing you could copy. There's nothing to copy. It's a tautology wearing a cap and gown. The man who built it rode that number somewhere very interesting — but we'll get to him."
  },
  {
    "type": "heading",
    "text": "What I got for the real thing"
  },
  {
    "type": "paragraph",
    "text": "Here's the part that still sits in my chest."
  },
  {
    "type": "paragraph",
    "text": "The school where I got my own scores was itself brand new — a first-year school carved into the old Montbello building, every newness bump going for it. Fresh start, fresh paint, fresh everything. And the newness bump was real. It just didn't do the thing it gets credit for. It didn't teach a single kid math. What it bought me was a room of students and parents who'd chosen to be there, who'd put up with a hard, relentless teacher long enough for the math to take. That's worth a lot. It's also not a method. It's a permission slip — and the teaching still had to happen inside it. The growth came from me and the other math teacher. Two guys teaching math. The newness opened the door. It didn't walk anybody through."
  },
  {
    "type": "paragraph",
    "text": "I taught with nobody watching me. No coach, no specialist correcting my form. I ran my room the way I wanted, which mostly meant strict — demanding, a little relentless, not always the warmest guy in the building, the kind of teacher a modern observation rubric would mark down for poor \"climate.\" And the math the two of us taught carried the building. The state scores growth on a scale where fifty is average — not average scores, average *growth*, how far a kid moved compared to kids who started where they did. Half land above it, half below. Our math growth came in well above fifty — strong enough that two math teachers pulled the whole building over its growth goal. The English department landed below it: by the state's own measure, its kids grew less than the typical kid that year. And English was the side of the building everyone pointed to as the one that really *got* the kids."
  },
  {
    "type": "paragraph",
    "text": "I'm not knocking those teachers. They were good with kids, and that's worth something real. But here's what the building did with its own numbers: it never said one of them out loud. It folded everything into a single warm sentence — the school \"exceeded expectations\" that year, as one happy family — and let the credit settle on the story it already preferred instead of the data it actually had. That's the machine. Not bad teachers versus good ones. An institution that will reach for its favorite story every time, even when its own measurements are sitting right there saying something else."
  },
  {
    "type": "paragraph",
    "text": "The district pays a bonus for exceeding growth targets — an actual mechanism it built to find and reward the exact thing it says it wants. It paid twice that year. The school earned one for clearing its goal, and I earned an individual one on top of it, for my own growth. It was a good year, and I needed the money. And here's the tell: the system's own checkbook found me even when its mouth never did. The data knew exactly who moved the number. The building just didn't feel like saying it."
  },
  {
    "type": "paragraph",
    "text": "Then nobody acknowledged it. Not the year it happened, not after."
  },
  {
    "type": "paragraph",
    "text": "The only acknowledgment I ever got came from outside the system, and it came late. A teacher wrote to me when my very first class — sixth graders I'd taught, then left after their seventh-grade year — was graduating high school. Five years gone, five grades up the road, and she wanted me to know they still talked about me. Still named me their favorite. Not all of them, obviously. But a lot of them, for a guy who'd walked out half a decade earlier. That's the thing the system has no column for. Real teaching doesn't photograph. You can't tour it. It just sits there being true, and the system has never once known what to do with quietly true. It can't sell it, so it can't see it."
  },
  {
    "type": "paragraph",
    "text": "And I'll tell you something I'm not supposed to say, because it cuts against my own numbers too. A lot of what I did those years wasn't teaching. It was getting kids to stop sandbagging — and there were two ways to do it."
  },
  {
    "type": "paragraph",
    "text": "The first one was just the truth. These kids weren't dumb and they weren't lazy. They tested low because they'd read the situation correctly: the system expected nothing from them and was going to get exactly that. So I told them so. I said the system has already decided who you are. It's betting you'll score low, like always, and if you coast you hand it the proof. But that's a choice, and it's yours. Trying won't cost you a thing — not more time, not more pain. Do it and you show them they were wrong about you. Don't ever let anyone sell you that short. For the kids who could still feel the sting of being underestimated, that was enough. Their scores went through the roof, because nobody had ever told them the test was a place to fight back."
  },
  {
    "type": "paragraph",
    "text": "But some kids are past that. They've already taken the verdict in and handed it back; the system gave up on them and they returned the favor, and no speech about who they really are is going to reach them. Those kids I bribed. Beat your own score on the next test and I'll raise your grade. Crude, transactional, and it worked too — a different lever for the kids the truth couldn't move."
  },
  {
    "type": "paragraph",
    "text": "Here's the part that matters, and it's true of both moves. Neither one is a teaching trick, because the teaching was never the hard part. Math from kindergarten through tenth grade is basic. Through geometry, the basics are within almost any kid's reach. That doesn't mean it's easy for every kid in every condition — disability, trauma, hunger, a childhood of interrupted schooling are all real, and they're real work to teach through. It means the floor is far lower than the system pretends, and most of the kids who can't clear it can't because the system spent years making them hate it: the drudgery, the pointlessness, the way it's taught like a punishment for a crime nobody can name. By the time these kids got to me, most of them didn't think they were bad at math. They were just done with it, and they had earned the right to be."
  },
  {
    "type": "paragraph",
    "text": "So I didn't unlock anything. I removed one obstacle — the belief that trying was pointless — and the kids did the rest themselves, because the math was within reach. That's not a gift. My real skill as a math teacher isn't math. It's that I hate the system exactly as much as they do, and I understand precisely why they hate it, and I'm willing to say so to their faces. That's the whole trick. Solidarity, not pedagogy. I've run it several times and it works every time, because the floor is right there and all anyone has to do is sweep it."
  },
  {
    "type": "paragraph",
    "text": "And that's the part that should make every administrator in the building uncomfortable, not me. I'm not describing something rare or brilliant. I'm describing something easy, that almost nobody does, inside a system that makes the easy thing feel impossible. You can sometimes get a second jump once a kid believes the number can move. Then you're out — because sweeping the floor was never the same as raising the ceiling, and I was never allowed to raise the ceiling. Not inside the testing window. Not inside the real math classes. The only place I ever got to teach a real lesson was a twelfth-grade class I built myself, parked outside the testing window, where the system finally stopped watching and I could do whatever I wanted. Think about what it means that the only honest room in my career was the one nobody was grading."
  },
  {
    "type": "paragraph",
    "text": "And the building itself? Years later they undid the small-schools experiment, put Montbello back together, and started giving other educators professional development on growth — on methods nobody has shown to do anything yet. Set that beside what I just told you. The same system that paid me for proven growth and never said my name now packages unproven growth out of the same building and sells it as a model. The proven thing got a check and a silence. The unproven thing gets a tour."
  },
  {
    "type": "figure",
    "image": "bodyImageThree",
    "alt": "A split illustration contrasting a glossy school marketing event on one side with a quiet teacher-led discussion on the other.",
    "caption": "The work that matters seldom makes the brochure."
  },
  {
    "type": "heading",
    "text": "Who holds the stick"
  },
  {
    "type": "paragraph",
    "text": "So look at who holds the measuring stick."
  },
  {
    "type": "paragraph",
    "text": "The people who decide what success means in a school are, mostly, people who never produced it in a classroom — or who produced it the way I've just described, by controlling the roster and catching the bumps. They set the target from up there, then hand it down as an order: match these numbers. And when the rest of us can't, because we can't shed our hardest kids and we never got the bump, they read it as a failure of our effort instead of a difference in our rosters."
  },
  {
    "type": "paragraph",
    "text": "Then they do the cruelest thing of all, with the real successes — the genuine ones that didn't last. A good school falls apart the moment its principal leaves. A strong program dies when the grant runs dry. A standout high school collapses the year it's finally forced to enroll its whole neighborhood. And the system points at the wreckage and says: see, nothing better is possible. But it's backwards. The good thing didn't fail because it was too fragile to copy. It failed because it was never the thing being copied. What got copied was the selection and the rate."
  },
  {
    "type": "paragraph",
    "text": "That's the theory, and I've come to believe it all the way down. The kids learn. The good teachers teach. What isn't real is the story the system tells on top of them — that its model produced the number, that here is a thing you could bottle and ship. There's nothing in the bottle. So what scales instead is the fantasy of success, and the fantasy is cheap, portable, photogenic, and endlessly fundable. It's made of exactly the stuff that travels: a number, a banner, a story, a tour. The child learning something was always real — real work, by real teachers — and the system treated it as incidental, something happening off to the side, unbannered, while the cameras pointed at the fantasy."
  },
  {
    "type": "paragraph",
    "text": "And the people who run that fantasy best — the ones who can turn a roster into a legend and a tautology into a headline — don't get caught. They don't get corrected. They don't get quietly moved aside."
  },
  {
    "type": "paragraph",
    "text": "They get promoted."
  },
  {
    "type": "paragraph",
    "text": "That's the next one."
  },
  {
    "type": "figure",
    "image": "bodyImageFour",
    "alt": "A success-branded school propped up on supports beside a collapsing copy, watched by students and a figure holding a notebook labeled real conditions.",
    "caption": "Copy the facade and you copy the failure. The conditions were the real thing."
  }
];

function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /(\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;
  let lastIndex = 0;
  let partIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);

    if (linkMatch) {
      parts.push(
        <a key={`link-${partIndex}`} href={linkMatch[2]}>
          {linkMatch[1]}
        </a>,
      );
    } else {
      parts.push(<em key={`em-${partIndex}`}>{token.slice(1, -1)}</em>);
    }

    partIndex += 1;
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

const postBody = (
  <>
    {postBlocks.map((block, index) => {
      if (block.type === "heading") {
        return <h2 key={`heading-${index}`}>{block.text}</h2>;
      }

      if (block.type === "figure") {
        return (
          <PostFigure
            key={`figure-${index}`}
            src={imageMap[block.image]}
            alt={block.alt}
            caption={block.caption}
          />
        );
      }

      return <p key={`paragraph-${index}`}>{renderInline(block.text)}</p>;
    })}
  </>
);

const post: LifeEducationPost = {
  ...metadata,
  body: postBody,
};

export default post;
