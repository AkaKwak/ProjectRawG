export const LoadingSpinner = () => {
  const template = `
    <div class="loading-spinner">
      <div class="spinner"></div>
    </div>
  `;

  return {
    render: () => template
  };
}; 