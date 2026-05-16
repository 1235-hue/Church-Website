const beliefs = [
  { title: 'The Father', body: "We believe in God the Father, an infinite, personal Spirit, perfect in holiness, wisdom, power and love; that He concerns Himself mercifully in the affairs of men; that He hears and answers prayer; and that He saves from sin and death all who come to Him through Jesus Christ." },
  { title: 'The Son', body: "We believe in Jesus Christ, God's only begotten Son. We believe in His virgin birth, sinless life, miracles and teachings, His substitutionary atoning death, bodily resurrection, ascension into heaven, perpetual intercession for His people, and personal visible return to earth." },
  { title: 'Holy Spirit', body: "We believe in the Holy Spirit, who came forth from the Father and Son to convict the world of sin, righteousness, and judgment, and to regenerate, sanctify and empower for ministry all who believe in Christ; we believe the Holy Spirit indwells every believer in Jesus Christ and that He is an abiding Helper, Teacher, and Guide. We believe in the present ministry of the Holy Spirit, the validity of the Baptism of the Holy Spirit, and in the exercise of all the biblical gifts of the Spirit." },
  { title: 'The Bible', body: "We believe that the scriptures of the Old and New Testaments are the Word of God, fully inspired without error in the original manuscripts, and the infallible rule of faith and practice." },
];

const summary = [
  'The unity of God the Father, the Son and the Holy Spirit.',
  'Divine inspiration and trustworthiness of the Holy Scriptures as originally given, being supreme authority in all matters of faith and conduct.',
  'Sovereignty of God in creation, revelation, redemption and final judgment.',
  "Sinfulness and guilt of all men since the fall rendering them subject to God's wrath and condemnation.",
  'Redemption from sin and its consequences solely through the sacrificial death of the Lord Jesus Christ, the incarnate Son of God.',
  'The bodily resurrection of Jesus Christ from the dead and his ascension to the right hand of God the Father.',
  'The necessity of the work of the Holy Spirit to make the death of Jesus Christ effective to the individual sinner granting him repentance towards God and faith in Jesus Christ.',
  "Justification of the sinner by God's grace through faith alone.",
  'The indwelling and work of the Holy Spirit in every believer.',
  'The universal church which is the body of Christ and to which believers belong.',
];

const values = [
  { title: 'Holiness', body: "We value holiness in all our relationships and our daily activities. There is no price too high to compromise God's standard of holiness on our daily operations. Therefore, we are committed to upholding biblical character and conduct in everything we do." },
  { title: 'Truth', body: 'We acknowledge that God is our source of knowledge and wisdom. We recognize that in this world there are many sources of knowledge and wisdom. We affirm that we shall continually check the rightness of knowledge from any source (for example from books, internet, consultants or traditions we have inherited) based on biblical truth.' },
  { title: 'Faith', body: 'We affirm our faith in God in all our endeavors and operations as enshrined in the Bible. We stand firm in faith as individuals and corporately in order to achieve our destiny.' },
  { title: 'Integrity', body: 'We believe that as faith and scripture based Church, we should have the quality of being honest and having strong moral principles.' },
  { title: 'Excellence', body: 'God is a God of excellence and quality. Hence we seek to demonstrate higher standards of excellence and quality in all our activities. We strive to be role models of excellence.' },
  { title: 'Servant Leadership', body: 'We believe in servant leadership where leaders advance the course of those they lead and developing others. These leaders serve and use their God-given authority appropriately not yielding in to selfish interest or ambitions. We affirm that for order to exist we shall fully support and encourage our leaders.' },
  { title: 'Unity in Diversity', body: 'We value the unity of the body of Christ which our Lord Jesus Christ prayed that we should display before the world. We also appreciate the beauty of the diversity in which God has created. Hence we appreciate people regardless of race, ethnic background, color of skin, language, personality, financial status, social standing or political persuasion. This diversity is contained within the unity of faith as stipulated in our statement of Faith.' },
];

export default function About() {
  return (
    <div className="space-y-12">
      <header className="text-center space-y-3">
        <p className="uppercase tracking-[0.2em] text-xs text-amber-600">About Us</p>
        <h1 className="text-4xl md:text-5xl font-display text-brand-900">Cathedral of Praise Ministries Int'l</h1>
        <p className="text-stone-600">Mbita Faith Memorial Church</p>
      </header>

      {/* Theme Verse */}
      <section className="rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-200 p-8 shadow-sm">
        <h2 className="text-2xl font-display text-brand-900 mb-3">Our Theme Verse</h2>
        <blockquote className="border-l-4 border-amber-500 pl-4 italic text-stone-700">
          "The apostles performed many signs and wonders among the people. And all the believers used to meet together in Solomon's Colonnade." — Acts 5:12
        </blockquote>
        <p className="mt-4 text-stone-700">
          We believe that when the Gospel is shared and people believe the Son of God Jesus Christ, many transformative miracles continue to happen in their lives even as they dwell together as they exercise their faith and continue in fellowship. We encourage the meeting together of brethren.
        </p>
      </section>

      {/* Vision / Mission / Motto */}
      <section className="grid md:grid-cols-3 gap-5">
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <div className="text-amber-600 text-2xl">🌅</div>
          <h3 className="text-xl font-display text-brand-900 mt-2">Vision</h3>
          <p className="text-stone-700 mt-2 text-sm leading-relaxed">
            To create a community of believers transformed by hearing the Gospel — lives transformed and people committed to God. We trust God to be a Centre of Transformation by raising a generation of role model Christians.
          </p>
        </div>
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <div className="text-amber-600 text-2xl">📖</div>
          <h3 className="text-xl font-display text-brand-900 mt-2">Mission</h3>
          <p className="text-stone-700 mt-2 text-sm leading-relaxed">
            To make disciples by teaching the Word of God verse-by-verse, with weekly Bible study for everyone. We share the truth in love, mature believers in Christ, and equip them for effective service and witness.
          </p>
        </div>
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <div className="text-amber-600 text-2xl">💛</div>
          <h3 className="text-xl font-display text-brand-900 mt-2">Our Motto</h3>
          <p className="text-stone-700 mt-2 text-sm leading-relaxed">
            We are a spiritually and socially caring church. <span className="font-semibold">Here, everyone is important.</span>
          </p>
        </div>
      </section>

      {/* Statement of Faith */}
      <section>
        <h2 className="text-3xl font-display text-brand-900 mb-2">Statement of Faith</h2>
        <p className="text-stone-600 mb-6">What We Believe</p>
        <div className="grid md:grid-cols-2 gap-5">
          {beliefs.map((b) => (
            <div key={b.title} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-brand-900">{b.title}</h3>
              <p className="text-stone-700 mt-2 text-sm leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-stone-50 border border-stone-200 rounded-2xl p-6">
          <h3 className="font-semibold text-brand-900 mb-3">In Summary, we affirm:</h3>
          <ul className="space-y-2 text-sm text-stone-700">
            {summary.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-amber-600 font-semibold shrink-0">{i + 1}.</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Core Values */}
      <section>
        <h2 className="text-3xl font-display text-brand-900 mb-6">Core Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v) => (
            <div key={v.title} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-brand-900">{v.title}</h3>
              <p className="text-stone-700 mt-2 text-sm leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing verse */}
      <section className="text-center bg-brand-900 text-brand-50 rounded-2xl p-10">
        <blockquote className="text-lg italic max-w-3xl mx-auto">
          "And this gospel of the kingdom shall be preached in all the world for a witness unto all nations; and then shall the end come."
        </blockquote>
        <p className="mt-3 text-amber-300 font-semibold">Matthew 24:14</p>
      </section>
    </div>
  );
}
