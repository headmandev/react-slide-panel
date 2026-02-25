export function PropertyDocumentation() {
  return (
    <>
      <h3 className="section-heading doc-title">Documentation</h3>
      <h4 className="doc-subtitle">Properties</h4>
      <div className="table-container">
        <table className="table is-bordered is-striped is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>idName</th>
              <td>string</td>
              <td>default: <b>&apos;rsp-container&apos;</b></td>
              <td>ID of the portal container element for all side panels</td>
            </tr>
            <tr>
              <th>side</th>
              <td>&apos;right&apos; | &apos;bottom&apos; | &apos;left&apos; | &apos;top&apos;</td>
              <td>default: <b>&apos;right&apos;</b></td>
              <td>Which side the panel slides from</td>
            </tr>
            <tr>
              <th>rerender</th>
              <td>boolean</td>
              <td>default: <b>true</b></td>
              <td>
                When true, unmount panel when closed and remount when opened. When false, panel stays mounted and is only shown/hidden.
              </td>
            </tr>
            <tr>
              <th>hideCloseBtn</th>
              <td>boolean</td>
              <td>default: <b>false</b></td>
              <td>Hide the default close button</td>
            </tr>
            <tr>
              <th>noClose</th>
              <td>boolean</td>
              <td>default: <b>false</b></td>
              <td>Disable closing by clicking the overlay</td>
            </tr>
            <tr>
              <th>zIndex</th>
              <td>number | &apos;auto&apos;</td>
              <td>default: <b>&apos;auto&apos;</b></td>
              <td>z-index of overlay and panel. &apos;auto&apos; uses a high default.</td>
            </tr>
            <tr>
              <th>width</th>
              <td>string</td>
              <td>default: <b>&apos;auto&apos;</b></td>
              <td>Panel width (e.g. &apos;500px&apos;). Only for side &apos;left&apos; or &apos;right&apos;.</td>
            </tr>
            <tr>
              <th>height</th>
              <td>string</td>
              <td>default: <b>&apos;auto&apos;</b></td>
              <td>Panel height (e.g. &apos;500px&apos;). Only for side &apos;top&apos; or &apos;bottom&apos;.</td>
            </tr>
            <tr>
              <th>lockScroll</th>
              <td>boolean</td>
              <td>default: <b>false</b></td>
              <td>Lock body scroll when the panel is open.</td>
            </tr>
            <tr>
              <th>lockScrollHtml</th>
              <td>boolean</td>
              <td>default: <b>true</b></td>
              <td>When lockScroll is true, also set overflow hidden on html.</td>
            </tr>
            <tr>
              <th>transitionName</th>
              <td>string | undefined</td>
              <td>default: <b>undefined</b></td>
              <td>
                slide-right | slide-left | slide-top | slide-bottom. Default picks based on side. Or pass a custom class and define .your-name-enter-active and .your-name-leave-active in CSS.
              </td>
            </tr>
            <tr>
              <th>overlayColor</th>
              <td>string</td>
              <td>default: <b>&apos;black&apos;</b></td>
              <td>Overlay background color (any valid CSS color).</td>
            </tr>
            <tr>
              <th>overlayOpacity</th>
              <td>number</td>
              <td>default: <b>0.5</b></td>
              <td>Overlay opacity (0–1).</td>
            </tr>
            <tr>
              <th>overlayDuration</th>
              <td>number</td>
              <td>default: <b>500</b></td>
              <td>Overlay transition duration in ms.</td>
            </tr>
            <tr>
              <th>panelColor</th>
              <td>string</td>
              <td>default: <b>&apos;white&apos;</b></td>
              <td>Panel background color.</td>
            </tr>
            <tr>
              <th>panelDuration</th>
              <td>number</td>
              <td>default: <b>300</b></td>
              <td>Panel transition duration in ms.</td>
            </tr>
            <tr>
              <th>headerClass</th>
              <td>string</td>
              <td>default: <b>&apos;&apos;</b></td>
              <td>Class for the header container.</td>
            </tr>
            <tr>
              <th>bodyClass</th>
              <td>string</td>
              <td>default: <b>&apos;&apos;</b></td>
              <td>Class for the scrollable body container.</td>
            </tr>
            <tr>
              <th>footerClass</th>
              <td>string</td>
              <td>default: <b>&apos;&apos;</b></td>
              <td>Class for the footer container.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4 className="doc-subtitle">Events / Callbacks</h4>
      <div className="table-container">
        <table className="table is-bordered is-striped is-narrow is-fullwidth">
          <tbody>
            <tr>
              <th>onOpened</th>
              <td colSpan={3}>Called when the open transition finishes and the panel is visible.</td>
            </tr>
            <tr>
              <th>onClosed</th>
              <td colSpan={3}>Called when the close transition finishes and the panel is hidden.</td>
            </tr>
            <tr>
              <th>onOpenChange</th>
              <td colSpan={3}>Called when the open state should change (e.g. user closes via overlay or close button). Pass the new boolean value to update controlled state.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
