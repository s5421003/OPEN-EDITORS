import { useEffect, useState } from "react";
import { fetchImages } from "api";

function Header() {
    return (
      <header className="hero is-dark is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">日本大学文理学部情報科学科 Webプログラミングの演習課題</h1>
          </div>
        </div>
      </header>
    );
  }
  
function Image(props) {
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image">
            <img src={props.src} alt="cute dog!" />
          </figure>
        </div>
      </div>
    );
  }
  
function Loading() {
    return <p>Loading...</p>;
}

function Gallery(props) {
    const { urls } = props;
    if (urls == null) {
        return <Loading />;
    }
    return (
      <div className="columns is-vcentered is-multiline">
        {urls.map((urls) => {
          return (
            <div key={urls} className="column is-3">
              <Image src={urls} />
            </div>
          );
        })}
      </div>
    );
  }

function Form(props) {
    function handleSubmit(event) {
        event.preventDefault();
        const { breed } = event.target.elements;
        props.onFormSubmit(breed.value);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <div className="select is-fullwidth">
                    <select name="breed" defaultValue="shibes">
                      <option value="shibes">Shibes</option>
                      <option value="cats">cats</option>
                      <option value="birds">birds</option>
                    </select>
                  </div>
                </div>
                <div className="control">
                  <button type="submit" className="button is-dark">
                    Reload
                  </button>
                </div>
              </div>
            </form>
        </div>
      );
    }
  
  function Main() {
    const [urls, setUrls] = useState(null);
    useEffect(() => {
        fetchImages("shibes").then((urls) => {
            console.log(urls);
            setUrls(urls);
        });
    }, []);
    function reloadImages(breed) {
        fetchImages(breed).then((urls) => {
            setUrls(urls);
        });
    }
    return (
      <main>
        <section className="section">
          <div className="container">
            <Form onFormSubmit={reloadImages} />
          </div>
        </section>
        <section className="section">
          <div className="container">
            <Gallery urls={urls} />
          </div>
        </section>
      </main>
    );
  }
  
  function Footer() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <p>Dog, cat and bird images are retrieved from shibe.online API</p>
          <p>
            <a href="https://shibe.online">Donate to shibe.online API</a>
          </p>
          <p>5421003 川原未波</p>
        </div>
      </footer>
    );
  }
  
  function App() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
  
  export default App;
