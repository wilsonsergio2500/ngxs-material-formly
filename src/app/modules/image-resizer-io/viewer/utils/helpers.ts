export namespace Helpers {

  export const CreateAspecRatioStyle = (ratiow: number, ratioh: number) => {

    const style = document.createElement('style');
    style.type = 'text/css'

    const name = `aspect-ratio-${ratiow}-${ratioh}`;
    const exist = document.getElementById(name);

    if (!exist) {
      style.id = name;

      const css = ` .aspect-ratio-${ratiow}-${ratioh}::before {
                    content: "";
                    display: inline-block;
                    width: 1px;
                    height: 0;
                  padding-bottom: calc(100% / (${ratiow}/${ratioh}));
                }`

      style.innerHTML = css;

      const head = document.querySelector('head');
      head.appendChild(style);
    }

    return name;

  }

  export const CreateAspectRatioClass = (aspectRatio: string) => {

    const style = document.createElement('style');
    style.type = 'text/css'

    const name = `aspect-ratio-${aspectRatio}`;
    const exist = document.getElementById(name);

    if (!exist) {
      style.id = name;

      const css = `* img-upload .prev-img-container > .aspect-ratio-${aspectRatio}::before {
                    content: "";
                    display: inline-block;
                    width: 1px;
                    height: 0;
                  padding-bottom: calc(100% / (${aspectRatio}));
                }`

      style.innerHTML = css;

      const head = document.querySelector('head');
      head.appendChild(style);
    }

    return name;
  }

}
