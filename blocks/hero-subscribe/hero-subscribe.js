import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Expected structure in the block:
  // Row 1: byline text
  // Row 2: heading text
  // Row 3: description text
  // Row 4: CTA text
  // Row 5: button/link
  // Row 6: image

  const rows = [...block.children];

  if (rows.length < 6) return;

  // Create left content container
  const contentContainer = document.createElement('div');
  contentContainer.className = 'hero-subscribe-content';

  // Create content inner wrapper
  const contentInner = document.createElement('div');
  contentInner.className = 'hero-subscribe-content-inner';

  // Byline
  if (rows[0]) {
    const byline = document.createElement('p');
    byline.className = 'hero-subscribe-byline';
    byline.textContent = rows[0].textContent.trim();
    contentInner.append(byline);
  }

  // Heading
  if (rows[1]) {
    const heading = document.createElement('h1');
    heading.className = 'hero-subscribe-heading';
    heading.textContent = rows[1].textContent.trim();
    contentInner.append(heading);
  }

  // Description
  if (rows[2]) {
    const description = document.createElement('p');
    description.className = 'hero-subscribe-description';
    description.textContent = rows[2].textContent.trim();
    contentInner.append(description);
  }

  // CTA text
  if (rows[3]) {
    const ctaText = document.createElement('p');
    ctaText.className = 'hero-subscribe-cta-text';
    ctaText.textContent = rows[3].textContent.trim();
    contentInner.append(ctaText);
  }

  // Button/link
  if (rows[4]) {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'hero-subscribe-button-wrapper';
    const link = rows[4].querySelector('a');
    if (link) {
      link.className = 'hero-subscribe-button';
      buttonWrapper.append(link);
    }
    contentInner.append(buttonWrapper);
  }

  contentContainer.append(contentInner);

  // Create image container
  const imageContainer = document.createElement('div');
  imageContainer.className = 'hero-subscribe-image';

  if (rows[5]) {
    const picture = rows[5].querySelector('picture');
    if (picture) {
      imageContainer.append(picture);
    }
  }

  // Clear block and add new structure
  block.textContent = '';
  block.append(contentContainer);
  block.append(imageContainer);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) =>
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])
    )
  );
}
