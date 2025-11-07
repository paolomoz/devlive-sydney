export default function decorate(block) {
  // Hero-trends block structure:
  // Row 1: Byline (optional)
  // Row 2: Main heading (large, multi-line display)
  // Row 3: Description text
  // Row 4: Call-to-action text
  // Row 5: Button link
  // Row 6: Hero image

  const rows = [...block.children];

  // Create the main container structure
  const container = document.createElement('div');
  container.className = 'hero-trends-container';

  // Create text content wrapper
  const textContent = document.createElement('div');
  textContent.className = 'hero-trends-content';

  // Create image wrapper
  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'hero-trends-image';

  // Process each row
  rows.forEach((row, index) => {
    const cells = [...row.children];
    const content = cells[0];

    if (index === 0 && content) {
      // Byline
      const byline = document.createElement('div');
      byline.className = 'hero-trends-byline';
      byline.innerHTML = content.innerHTML;
      textContent.appendChild(byline);
    } else if (index === 1 && content) {
      // Main heading
      const heading = document.createElement('h1');
      heading.className = 'hero-trends-heading';
      heading.innerHTML = content.innerHTML;
      textContent.appendChild(heading);
    } else if (index === 2 && content) {
      // Description
      const description = document.createElement('div');
      description.className = 'hero-trends-description';
      description.innerHTML = content.innerHTML;
      textContent.appendChild(description);
    } else if (index === 3 && content) {
      // CTA text
      const ctaText = document.createElement('div');
      ctaText.className = 'hero-trends-cta-text';
      ctaText.innerHTML = content.innerHTML;
      textContent.appendChild(ctaText);
    } else if (index === 4 && content) {
      // Button
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'hero-trends-button-container';
      const link = content.querySelector('a');
      if (link) {
        link.className = 'button';
      }
      buttonContainer.innerHTML = content.innerHTML;
      textContent.appendChild(buttonContainer);
    } else if (index === 5 && content) {
      // Image
      const picture = content.querySelector('picture');
      if (picture) {
        imageWrapper.appendChild(picture);
      }
    }
  });

  // Clear the block and add new structure
  block.innerHTML = '';
  container.appendChild(textContent);
  container.appendChild(imageWrapper);
  block.appendChild(container);
}
