import { getContentBySlug, markdownToHtml } from '@/utils/mdx';
import Link from 'next/link';

export default async function ExampleGcodePage() {
  // If there's a specific README for example-gcode, we'll use it
  // Otherwise, we'll create a custom view
  let contentHtml = '';
  try {
    const { content } = getContentBySlug('example-gcode');
    contentHtml = await markdownToHtml(content);
  } catch (error) {
    // No specific markdown file found, we'll use a default template
  }

  return (
    <article className="prose max-w-none">
      {contentHtml ? (
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      ) : (
        <>
          <h1>Example G-code Files</h1>
          <p>
            Here are some example G-code files you can use with your CNC plotter. 
            These files contain instructions that will move the plotter in various patterns.
          </p>
          
          <h2>Available Examples</h2>
          <ul>
            <li>
              <Link href="/example-gcode/test-circle.gcode" className="text-blue-600 hover:underline">
                Test Circle
              </Link> - A simple circle pattern to test basic movement
            </li>
            <li>
              <Link href="/example-gcode/test-square.gcode" className="text-blue-600 hover:underline">
                Test Square
              </Link> - A square pattern to test right angles and straight lines
            </li>
            <li>
              <Link href="/example-gcode/jlcmc-logo.gcode" className="text-blue-600 hover:underline">
                JLCMC Logo
              </Link> - Draw the JLCMC logo
            </li>
            <li>
              <Link href="/example-gcode/complete-test-pattern.gcode" className="text-blue-600 hover:underline">
                Complete Test Pattern
              </Link> - A comprehensive test pattern that exercises all axes
            </li>
          </ul>
          
          <h2>Using These Files</h2>
          <p>
            To use these G-code files with your CNC plotter:
          </p>
          <ol>
            <li>Download the G-code file by right-clicking on the link and selecting "Save link as..."</li>
            <li>Open Universal G-code Sender (UGS) or your preferred G-code sender application</li>
            <li>Connect to your CNC plotter</li>
            <li>Load the G-code file</li>
            <li>Make sure your plotter is properly calibrated</li>
            <li>Click "Send" or "Run" to start the plotting process</li>
          </ol>
          
          <p>
            For more detailed instructions on using G-code with your plotter, 
            please refer to the <Link href="/ugs-guide">UGS Guide</Link> section.
          </p>
        </>
      )}
    </article>
  );
}
