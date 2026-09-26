import { useEffect, useState } from 'react'
import './App.css'

const pages = ['Home', 'About', 'Projects', 'Education', 'Services', 'Contact']

// Project facts, education, and contact details come from Wenbo Lin's résumé.
const projects = [
  {
    name: 'Flight History Analyzer',
    date: 'September 2026',
    image: '/project-flight.svg',
    description: 'I built a Python command-line tool that summarizes flights by month, route, airline, and airport. It validates CSV data, handles missing timestamps, and calculates travel time and estimated distance.',
  },
  {
    name: 'WordCards',
    date: 'September 2026',
    image: '/project-cards.svg',
    description: 'I developed a responsive vocabulary flashcard page using HTML, CSS, and JavaScript, with card navigation, answer reveal, and reversible progress tracking.',
  },
  {
    name: 'Medication Reminder and Support System',
    date: 'April 2026',
    image: '/project-medication.svg',
    description: 'As a requirements contributor in a five-person team, I wrote a use-case specification with seven workflow steps and four exception scenarios, and created UML activity and sequence diagrams.',
  },
]

function pageFromHash() {
  const page = location.hash.slice(2).toLowerCase()
  return pages.find(item => item.toLowerCase() === page) || 'Home'
}

function App() {
  const [page, setPage] = useState(pageFromHash)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const onHashChange = () => {
      setPage(pageFromHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    document.title = page + ' | Wenbo Lin'
  }, [page])

  function saveMessage(event) {
    event.preventDefault()
    // The assignment asks the form to capture entries and return to Home.
    sessionStorage.setItem('portfolioMessage', JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))))
    setSent(true)
    location.hash = '#/home'
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#/home"><span className="logo" aria-hidden="true">WL</span><span>Wenbo Lin</span></a>
        <nav aria-label="Main navigation">
          {pages.map(item => <a key={item} href={'#/' + item.toLowerCase()} aria-current={page === item ? 'page' : undefined}>{item}</a>)}
        </nav>
      </header>

      <main className="container">
        {page === 'Home' && <section className="home">
          <p className="label">JUNIOR SOFTWARE DEVELOPER</p>
          <h1>Hi, I’m Wenbo Lin.</h1>
          <p>I’m a Software Engineering Technology student at Centennial College. I enjoy building practical tools and straightforward web experiences.</p>
          <p>My goal is to create useful, reliable software that solves real problems.</p>
          <div className="actions"><a className="button" href="#/about">About me</a><a className="button secondary" href="#/projects">View projects</a></div>
          {sent && <p className="notice" role="status">Your message was saved in this browser session.</p>}
        </section>}

        {page === 'About' && <section>
          <h1>About me</h1>
          <div className="about-grid">
            <img className="portrait" src="/Wenbo_Lin_Portrait.jpg" alt="Wenbo Lin outdoors" />
            <div>
              <h2>Wenbo Lin</h2>
              <p>I’m based in Toronto and studying Software Engineering Technology (Co-op) at Centennial College. My projects include a Python flight-analysis tool, an interactive flashcard page, and software requirements work for a team project.</p>
              <p>I work with Python, C#, JavaScript, SQL, HTML, and CSS. I also use Git and create use-case documents and UML diagrams.</p>
              <a className="button" href="/Wenbo_Lin_Resume.pdf" target="_blank" rel="noreferrer">View résumé (PDF)</a>
            </div>
          </div>
        </section>}

        {page === 'Projects' && <section>
          <h1>Projects</h1>
          <p>Three projects from my résumé.</p>
          <div className="project-grid">
            {projects.map(project => <article className="card" key={project.name}>
              <img src={project.image} alt={'Illustration for ' + project.name} />
              <div className="card-body"><h2>{project.name}</h2><p className="date">{project.date}</p><p>{project.description}</p></div>
            </article>)}
          </div>
        </section>}

        {page === 'Education' && <section>
          <h1>Education</h1>
          <article className="education">
            <p className="date">September 2025 – Present</p>
            <h2>Software Engineering Technology (Co-op) Advanced Diploma</h2>
            <p>Centennial College, Toronto, Ontario · In progress</p>
            <p>Relevant courses: Python Programming, C# Programming, Software Requirements Engineering, Database Concepts (SQL), Client-Side Web Development, Software Design, and Web Application Development.</p>
          </article>
        </section>}

        {page === 'Services' && <section>
          <h1>Services</h1>
          <p>Areas where I can help:</p>
          <div className="service-grid">
            <article className="card"><div className="service-icon" aria-hidden="true">⌘</div><div className="card-body"><h2>Web development</h2><p>Responsive pages using HTML, CSS, JavaScript, and React.</p></div></article>
            <article className="card"><div className="service-icon" aria-hidden="true">{'{ }'}</div><div className="card-body"><h2>Python tools</h2><p>Small programs for data validation, calculations, and automation.</p></div></article>
            <article className="card"><div className="service-icon" aria-hidden="true">◇</div><div className="card-body"><h2>Software design</h2><p>Use cases, UML diagrams, and clear requirements.</p></div></article>
          </div>
        </section>}

        {page === 'Contact' && <section>
          <h1>Contact</h1>
          <div className="contact-grid">
            <div>
              <h2>Get in touch</h2>
              <p>Toronto, Ontario</p>
              <p><a href="mailto:wenbolin488@gmail.com">wenbolin488@gmail.com</a></p>
              <p><a href="tel:4373622381">437-362-2381</a></p>
            </div>
            <form onSubmit={saveMessage}>
              <h2>Leave a message</h2>
              <div className="form-row"><label>First name<input name="firstName" required autoComplete="given-name" /></label><label>Last name<input name="lastName" required autoComplete="family-name" /></label></div>
              <div className="form-row"><label>Email<input name="email" type="email" required autoComplete="email" /></label><label>Contact number<input name="phone" type="tel" required autoComplete="tel" /></label></div>
              <label>Message<textarea name="message" rows="5" required /></label>
              <button className="button" type="submit">Save and return home</button>
              <p className="form-note">For this assignment, the form saves entries only in the current browser session; it does not send an email.</p>
            </form>
          </div>
        </section>}
      </main>

      <footer><div className="container">© {new Date().getFullYear()} Wenbo Lin</div></footer>
    </>
  )
}

export default App
