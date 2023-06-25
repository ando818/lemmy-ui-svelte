export const ssr = false;

export const load = ({ url }) => {
    const { pathname } = url
  
    let refresh = url.searchParams.get('refresh') === 'true'
    console.log(url)
    console.log(refresh)
    return {
      pathname,
      refresh
    }
  }