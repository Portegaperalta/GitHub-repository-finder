const body = document.querySelector('body')
const darkModeBtn = document.querySelector('#toggleDarkModeBtn')

const languageMenu = document.querySelector('#languageSelect')
const contentDisplayBox = document.querySelector('#contentDisplayBox')
const contentDisplayBoxTitle = document.querySelector('#contentDisplayBox h2')

const refreshBtn = document.querySelector('#refreshBtn')
const retryBtn = document.querySelector('#retryBtn')

// Search repositories api

const getRandomRepoByLang = async (lang) => {
  try {
    const config = { headers: { Accept: 'application/vnd.github+json' } }
    const res = await axios.get(`https://api.github.com/search/repositories?q=${lang}`, config)
    const filteredRepos = res.data.items.filter(repo => repo.language === lang)
    const randomRepo = filteredRepos[Math.floor(Math.random() * 16)]
    console.log(randomRepo)
  }
  catch (error) {
    console.log(`Error: ${error}`)
  }
}

getRandomRepoByLang('JavaScript')

languageMenu.addEventListener('click', (e) => {
  contentDisplayBoxTitle.classList.add('hidden')
})


// res.data.items[Math.floor(Math.random() * 16)]