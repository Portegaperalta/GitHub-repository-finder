const body = document.querySelector('body')
const darkModeBtn = document.querySelector('#toggleDarkModeBtn')

const languageMenu = document.querySelector('#languageSelect')
const contentDisplayBox = document.querySelector('#contentDisplayBox')

const refreshBtn = document.querySelector('#refreshBtn')
const retryBtn = document.querySelector('#retryBtn')

const getRepository = async () => {
  try {
    const config = { headers: { Accept: 'application/vnd.github+json' } }
    const res = await axios.get(`https://api.github.com/search/repositories?q=${languageMenu.value}`, config)
    console.log(res)
  }
  catch (error) {
    console.log(`Error: ${error}`)
  }

}

getRepository()