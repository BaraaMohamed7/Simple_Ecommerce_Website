export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split('/');

  return {
    resource: request[1],
    id: request[2],
    action: request[3],
  };
};



export const loading = () => {
  document.getElementById('main-container').innerHTML = `
    <div class="loading">
      <div>
      </div>
    </div>
  `;
};

export const rerender = async (component) => {
  loading();
  document.getElementById('main-container').innerHTML = await component.render();
  component.hasOwnProperty('after_render') ? await component.after_render() : null;
};

export default parseRequestUrl;
