export default function App() {
  const faqItems = [
    {
      label: 'Starting Point',
      question: 'What are you running toward, not just away from?',
      answer:
        'Kids who can run their own lives. School is not the point. The point is a young adult who can think, adapt, build relationships, handle money and health, and keep learning without waiting to be managed.',
    },
    {
      label: 'Plain English',
      question: 'What does “floor-complete” mean?',
      answer:
        'It means the kid can function in the real world. If you dropped them into a new city at 18, they would not panic. They would ask good questions, solve problems, handle money, navigate systems, and keep moving.',
    },
    {
      label: 'Common Objection',
      question: 'Is this just unschooling with a nicer name?',
      answer:
        'No. The Floor is a real contract. The Domains are a real coverage map. Kids get more ownership over time, but that is not the same thing as having no structure.',
    },
    {
      label: 'How It Fits',
      question: 'How do the Why, Floor, By 18, and Domains fit together?',
      answer:
        'The Why says what this is for. The Floor sets the minimum by 18. By 18 puts that in plain English. The Domains keep the broader map in view so blind spots do not get ignored.',
    },
  ];

  const domains = [
    'Literacy & Communication',
    'Mathematics & Logic',
    'Scientific Thinking & Observation',
    'Social Studies & Civics',
    'Philosophy & Ethics',
    'Economics & Finance',
    'Health & Physical Development',
    'Creative Expression',
    'Technology, Media & AI Literacy',
    'Life Skills & Project Execution',
  ];

  return (
    <div className="min-h-screen bg-black p-3 md:p-4">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-slate-100 to-slate-200 shadow-2xl">
        <header className="bg-black px-6 py-5 text-center">
          <a href="/" className="inline-block">
            <h1 className="font-serif text-4xl text-white md:text-5xl">LifeEducation.org</h1>
          </a>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-[0.88fr_1.12fr]">
          <div className="flex items-center px-6 py-8 md:px-11 md:py-10">
            <div className="max-w-2xl">
              <div className="inline-flex rounded-full border-[6px] border-emerald-700 bg-white/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">
                LifeEducation
              </div>
              <h2 className="mt-6 font-serif text-4xl leading-none text-slate-900 md:text-6xl">
                If you dropped them off in a strange city on a different continent, could they figure it out?
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 md:text-[22px]">
                Too much of the current system still rewards looking good on paper. I’m trying to raise kids who can think, adapt, solve problems, and function in real life.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center px-5 pb-8 md:px-7 md:pb-10">
            <div className="flex min-h-[380px] w-full items-center justify-center rounded-[28px] border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 p-8">
              <img
                src="/lifeeducation_tree_source.webp"
                alt=""
                aria-hidden="true"
                className="block h-auto w-[78%] max-w-[520px]"
              />
            </div>
          </div>
        </section>

        <section className="bg-black px-4 py-4 md:px-5 md:py-5">
          <div className="mx-auto w-full max-w-7xl overflow-hidden">
            <img
              className="block w-full h-auto"
              src="/lifeeducation_break_navigator.webp"
              alt="Young person navigating a foreign city with a map"
            />
          </div>
        </section>

        <section className="bg-zinc-950 px-6 py-12 text-white md:px-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border-[6px] border-emerald-700 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-500">
                The Why
              </div>
              <h3 className="mt-6 font-serif text-3xl leading-tight md:text-5xl">
                Most education talk starts in the wrong place.
              </h3>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                It starts with school. Or curriculum. Or standards. Or credentials. The better starting point is simpler: what should an 18-year-old actually be able to do, on their own, in real life?
              </p>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                This is not about tweaking school around the edges. It is about naming a better target and building around it directly. The goal is not paper success. The goal is real capability, autonomy, and judgment.
              </p>
              <a className="mt-8 inline-flex rounded-full border-[6px] border-emerald-700 bg-white px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-slate-100" href="https://docs.google.com/document/d/1iMa_sLEphCEfCAyG_JGlHgeNCwZRda5j/edit?usp=sharing&ouid=112063937930878626054&rtpof=true&sd=true" target="_blank" rel="noreferrer">
                Read the Why Statement
              </a>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[24px] bg-gradient-to-b from-slate-100 to-slate-200 p-6 text-slate-900">
                <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">Target</div>
                <div className="mt-3 font-serif text-2xl leading-tight">The Floor is the contract.</div>
                <div className="mt-3 text-base leading-8 text-slate-700">
                  Minimum adulthood capability by 18. Serious, non-negotiable, and not disguised curriculum theater.
                </div>
              </div>
              <div className="rounded-[24px] bg-gradient-to-b from-slate-100 to-slate-200 p-6 text-slate-900">
                <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">Priorities</div>
                <div className="mt-3 font-serif text-2xl leading-tight">Agency. Capability. Optionality.</div>
                <div className="mt-3 text-base leading-8 text-slate-700">
                  Integrity, Health, and Belonging complete the set. The system exists to serve those six priorities, not replace them.
                </div>
              </div>
              <div className="rounded-[24px] bg-gradient-to-b from-slate-100 to-slate-200 p-6 text-slate-900">
                <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">Shape</div>
                <div className="mt-3 font-serif text-2xl leading-tight">Keep it light.</div>
                <div className="mt-3 text-base leading-8 text-slate-700">
                  The point is not to turn family life into school at home. The point is a better target, clear guardrails, and a life where real things happen on purpose.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-200 px-6 py-12 md:px-14">
          <div className="inline-flex rounded-full border-[6px] border-emerald-700 bg-white/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">
            Q&amp;A
          </div>
          <h3 className="mt-6 font-serif text-3xl font-bold leading-tight text-emerald-900 md:text-5xl">
            The questions a serious parent or skeptic should ask.
          </h3>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
            Better to answer them plainly than hide the big distinctions under branding.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-[26px] bg-black p-7 text-white shadow-xl">
                <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-600">{item.label}</div>
                <div className="mt-3 font-serif text-2xl leading-tight">{item.question}</div>
                <div className="mt-4 text-base leading-8 text-slate-300">{item.answer}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-300 bg-black px-6 py-12 text-white md:px-14">
          <div className="inline-flex rounded-full border-[6px] border-emerald-700 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-500">
            The Floor + By 18
          </div>
          <h3 className="mt-6 font-serif text-3xl leading-tight md:text-5xl">
            The contract, and “By 18,” its public translation.
          </h3>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">
            The Floor is the non-negotiable minimum by 18. “By 18” says the same thing in plain language: not what classes they sat through, but what they can actually do. “By 18” is the deadline, not the earliest possible finish.
          </p>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">
            If they meet the Floor early, the job changes. Then it is maintenance, broader domain life, and more self-directed depth.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-[26px] bg-gradient-to-b from-slate-100 to-slate-200 p-7 text-slate-900 shadow-xl">
              <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">The contract</div>
              <div className="mt-3 font-serif text-2xl leading-tight">The 18-Year-Old Floor</div>
              <div className="mt-4 text-base leading-8 text-slate-700">
                This is the minimum line for adulthood capability. It is not a curriculum, and it does not tell you how to teach. It defines what has to be real before you can honestly say the Floor is met: a young adult who can function in the world without being managed like a child in an adult body.
              </div>
              <a className="mt-6 inline-flex rounded-full border border-slate-300 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800" href="https://docs.google.com/document/d/1kacHye8nhnrUbYarS9rgdN0o0b_6D5q2/edit?usp=sharing&ouid=112063937930878626054&rtpof=true&sd=true" target="_blank" rel="noreferrer">
                Read the Floor document
              </a>
            </div>

            <div className="rounded-[26px] border-[6px] border-emerald-700 bg-gradient-to-b from-slate-100 to-slate-200 p-7 text-slate-900 shadow-xl">
              <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">Public translation</div>
              <div className="mt-3 font-serif text-2xl leading-tight text-emerald-800">By 18: What You Can Do</div>
              <div className="mt-4 text-base leading-8 text-slate-700">
                This is the same contract in plain public language. It shows what floor-complete looks like in practice: run your own life, think clearly, handle money, own your health, use tech well, navigate real systems, and make real things.
              </div>
              <a className="mt-6 inline-flex rounded-full border-[6px] border-emerald-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800" href="https://docs.google.com/document/d/11nSF4vmnmNErNnsvcvMKWDo6g84fLYjU/edit?usp=sharing&ouid=112063937930878626054&rtpof=true&sd=true" target="_blank" rel="noreferrer">
                Read the By 18 document
              </a>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-300 bg-slate-200 px-6 py-12 md:px-14">
          <div className="inline-flex rounded-full border-[6px] border-emerald-700 bg-white/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">
            The 10 Domains
          </div>
          <h3 className="mt-6 font-serif text-3xl font-bold leading-tight text-emerald-900 md:text-5xl">
            The Floor is the minimum.
            <br />
            The Domains show the full map.
          </h3>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
            The Domains are here to keep blind spots visible. Families naturally overbuild what already matters to them and neglect what does not.
          </p>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
            They are not a second contract. The Floor is still the minimum. The Domains are the broader map of the life I want my kids growing up inside.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {domains.map((item) => (
              <div key={item} className="rounded-[22px] bg-black px-5 py-4 text-lg font-semibold leading-7 text-white shadow-lg">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-6 text-sm leading-7 text-slate-600">Contract first. Full map second.</div>
          <a className="mt-7 inline-flex rounded-full border-[6px] border-emerald-700 bg-white px-5 py-3 text-sm font-bold text-emerald-900 transition hover:bg-slate-100" href="https://docs.google.com/document/d/1pKnXKKN-HkGJ960HEgYYolWxJfMwhTY3/edit?usp=sharing&ouid=112063937930878626054&rtpof=true&sd=true" target="_blank" rel="noreferrer">
            Read the Domains document
          </a>
        </section>

        <section className="bg-black px-4 py-4 md:px-5 md:py-5">
          <div className="mx-auto w-full max-w-7xl overflow-hidden">
            <img
              className="block w-full h-auto"
              src="/site_break_02_contact_desk.webp"
              alt="Documents, notes, and letters prepared for serious public exchange"
            />
          </div>
        </section>

        <section className="border-t border-slate-300 bg-white px-6 py-12 md:px-14 md:py-14">
          <div className="inline-flex rounded-full border-[6px] border-emerald-700 bg-slate-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">
            Contact
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6">
            <div className="max-w-3xl">
              <h3 className="font-serif text-3xl font-bold leading-tight text-emerald-900 md:text-5xl">
                If you see something I’m missing, tell me.
              </h3>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                I’m building this for my own kids first. If you see a blind spot, a hole in the logic, or a better way to say something, send it.
              </p>
            </div>
            <div className="w-full rounded-[26px] bg-black p-7 text-white shadow-xl">
              <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-600">Public contact</div>
              <div className="mt-3 font-serif text-2xl leading-tight">
                <a href="mailto:LifeEducationInformation@gmail.com">LifeEducationInformation@gmail.com</a>
              </div>
              <div className="mt-4 text-base leading-8 text-slate-300">
                Use this address for objections, ideas, examples, or serious feedback.
              </div>
              <a className="mt-6 inline-flex rounded-full border-[6px] border-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10" href="mailto:LifeEducationInformation@gmail.com?subject=LifeEducation%20Website%20Feedback">
                Email your thoughts
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-slate-300 bg-black px-6 py-8 text-slate-300 md:px-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-sm leading-7">© LifeEducation.org</div>
            <div className="text-sm leading-7">
              <a className="hover:text-white" href="mailto:LifeEducationInformation@gmail.com">
                LifeEducationInformation@gmail.com
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
