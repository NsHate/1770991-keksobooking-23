export const form = document.querySelector('.ad-form');
export const mapFilters = document.querySelector('.map__filters');
export const childeForm = [...form.children];
export const childeFilter = [...mapFilters.children];

export const changePageState = (nodes, node, condition) => {
  nodes.forEach((element) => element.disabled = condition);

  if (condition) {
    node.classList.add(`${node.className}--disabled`);
  }
  else {
    node.classList.remove(`${node.className}--disabled`);
  }
};
