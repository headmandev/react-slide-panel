import { useState, useMemo, useRef } from 'react';
import { SidePanel } from 'react-side-panel';
import { CodeBlock } from './CodeBlock';

type Side = 'right' | 'left' | 'top' | 'bottom';

interface FormState {
  lockScroll: boolean;
  closeButton: boolean;
  side: Side;
  fixedHeader: boolean;
  fixedFooter: boolean;
  isRecursion: boolean;
  rerender: boolean;
  transitionName: string;
  panelDuration: number;
}

const initialForm: FormState = {
  lockScroll: true,
  closeButton: true,
  side: 'right',
  fixedHeader: false,
  fixedFooter: false,
  isRecursion: false,
  rerender: false,
  transitionName: 'auto',
  panelDuration: 300,
};

const sideRadioName = (() => {
  let n = 0;
  return () => `panel-side-${(n++).toString()}`;
})();

export function Options() {
  const [isOpened, setIsOpened] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const nameRef = useRef<string | null>(null);
  if (nameRef.current === null) nameRef.current = sideRadioName();
  const radioName = nameRef.current;

  const updateForm = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const stringOptions = useMemo(() => {
    const res = [
      form.lockScroll ? 'lockScroll' : '',
      !form.closeButton ? 'hideCloseBtn' : '',
      form.rerender ? 'rerender' : '',
      form.side !== 'right' ? `side="${form.side}"` : '',
      ['left', 'right'].includes(form.side) ? 'width="600px"' : '',
      ['top', 'bottom'].includes(form.side) ? 'height="500px"' : '',
      form.panelDuration !== 300 ? `panelDuration={${form.panelDuration}}` : '',
      form.panelDuration !== 300 ? `overlayDuration={${form.panelDuration}}` : '',
      form.transitionName !== 'auto' ? `transitionName="${form.transitionName}"` : '',
    ].filter(Boolean);
    return res.length === 0 ? '' : '\n    ' + res.join('\n    ');
  }, [form]);

  const fixedHeaderCode = useMemo(
    () =>
      form.fixedHeader
        ? `
  header={
    <div style={{ textAlign: 'center', backgroundColor: '#2d2d2d', color: 'white' }}>
      <h2 style={{ fontSize: '58px' }}>This is fixed header!</h2>
    </div>
  }`
        : '',
    [form.fixedHeader]
  );

  const bodyCode = useMemo(
    () =>
      `
  >
    <div style={{ paddingTop: 70, color: '#f14668' }}>
      {Array.from({ length: 50 }, (_, i) => (
        <h2 key={i} style={{ fontSize: '58px', fontWeight: 700, opacity: (i * 2) / 100, lineHeight: '43px' }}>
          This is scrolled body!
        </h2>
      ))}
    </div>
  </SidePanel>`,
    []
  );

  const fixedFooterCode = useMemo(
    () =>
      form.fixedFooter
        ? `
  footer={
    <div style={{ textAlign: 'center', backgroundColor: '#2d2d2d', color: 'white' }}>
      <h2 style={{ fontSize: '58px' }}>This is fixed footer!</h2>
    </div>
  }`
        : '',
    [form.fixedFooter]
  );

  const componentCodeExample = useMemo(
    () => `// BASIC EXAMPLE
import { useState } from 'react';
import { SidePanel } from 'react-side-panel';

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <SidePanel
        open={open}
        onOpenChange={setOpen}${stringOptions}${fixedHeaderCode}${fixedFooterCode}${bodyCode}
    </>
  );
}`,
    [stringOptions, fixedHeaderCode, fixedFooterCode, bodyCode]
  );

  const exampleCloseButtonCode = `<SidePanel
  open={open}
  onOpenChange={setOpen}
  header={
    <span onClick={() => setOpen(false)}> X </span>
  }
>
  ...
</SidePanel>`;

  return (
    <>
      <h3 className="section-heading">Options</h3>
      <div className="options-block">
        <div className="control-group">
          <span className="control-label">Side</span>
          <label className="radio-label">
            <input
              type="radio"
              name={radioName}
              value="right"
              checked={form.side === 'right'}
              onChange={() => updateForm('side', 'right')}
            />
            Right
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name={radioName}
              value="left"
              checked={form.side === 'left'}
              onChange={() => updateForm('side', 'left')}
            />
            Left
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name={radioName}
              value="top"
              checked={form.side === 'top'}
              onChange={() => updateForm('side', 'top')}
            />
            Top
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name={radioName}
              value="bottom"
              checked={form.side === 'bottom'}
              onChange={() => updateForm('side', 'bottom')}
            />
            Bottom
          </label>
        </div>

        <div className="checkbox-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={form.lockScroll}
              onChange={(e) => updateForm('lockScroll', e.target.checked)}
            />
            Lock scroll
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={form.closeButton}
              onChange={(e) => updateForm('closeButton', e.target.checked)}
            />
            Close button
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={form.fixedHeader}
              onChange={(e) => updateForm('fixedHeader', e.target.checked)}
            />
            Fixed header
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={form.fixedFooter}
              onChange={(e) => updateForm('fixedFooter', e.target.checked)}
            />
            Fixed footer
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={form.rerender}
              onChange={(e) => updateForm('rerender', e.target.checked)}
            />
            Render on opening
          </label>
        </div>

        <div className="select-row">
          <div className="field-inline">
            <span className="field-label">Transition name</span>
            <select
              value={form.transitionName}
              onChange={(e) => updateForm('transitionName', e.target.value)}
            >
              <option value="auto">auto</option>
              <option value="slide-right">Slide Right</option>
              <option value="slide-left">Slide Left</option>
              <option value="slide-top">Slide Top</option>
              <option value="slide-bottom">Slide Bottom</option>
            </select>
          </div>
          <div className="field-inline">
            <span className="field-label">Duration</span>
            <select
              value={form.panelDuration}
              onChange={(e) => updateForm('panelDuration', Number(e.target.value))}
            >
              <option value={0}>0ms</option>
              <option value={100}>100ms</option>
              <option value={300}>300ms</option>
              <option value={500}>500ms</option>
              <option value={1000}>1000ms</option>
            </select>
          </div>
        </div>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={form.isRecursion}
            onChange={(e) => updateForm('isRecursion', e.target.checked)}
          />
          Recursion mode
        </label>
      </div>

      <button type="button" className="demo-btn hero-cta" onClick={() => setIsOpened(true)}>
        CHECK IT OUT
      </button>

      <SidePanel
        open={isOpened}
        onOpenChange={setIsOpened}
        onOpened={() => console.log('onOpened: transition stopped and modal is opened')}
        onClosed={() => console.log('onClosed: transition stopped and modal is closed')}
        lockScroll={form.lockScroll}
        rerender={form.rerender}
        hideCloseBtn={!form.closeButton}
        width={['left', 'right'].includes(form.side) ? '600px' : 'auto'}
        height={['top', 'bottom'].includes(form.side) ? '500px' : 'auto'}
        side={form.side}
        panelDuration={form.panelDuration}
        overlayDuration={form.panelDuration}
        transitionName={form.transitionName === 'auto' ? undefined : form.transitionName}
        header={
          form.fixedHeader ? (
            <div
              style={{
                textAlign: 'center',
                backgroundColor: '#2d2d2d',
                color: 'white',
              }}
            >
              <h2 style={{ fontSize: '58px' }}>This is fixed header!</h2>
            </div>
          ) : undefined
        }
        footer={
          form.fixedFooter ? (
            <div
              style={{
                textAlign: 'center',
                backgroundColor: '#2d2d2d',
                color: 'white',
              }}
            >
              <h2 style={{ fontSize: '58px' }}>This is fixed footer!</h2>
            </div>
          ) : undefined
        }
      >
        {form.isRecursion ? (
          <div style={{ padding: 20 }}>
            <Options />
          </div>
        ) : null}
        <div
          style={{
            paddingTop: 70,
            color: '#f14668',
            backgroundColor: 'white',
          }}
        >
          {Array.from({ length: 50 }, (_, i) => (
            <h2
              key={i}
              style={{
                fontSize: '58px',
                fontWeight: 700,
                opacity: (i * 2) / 100,
                lineHeight: '43px',
              }}
            >
              This is scrolled body!
            </h2>
          ))}
        </div>
      </SidePanel>

      <div className="code-block-wrap">
        <CodeBlock code={componentCodeExample} />
      </div>

      {form.fixedHeader && (
        <div className="code-block-note">
          <hr />
          <p>
            You can hide the default close button with <code>hideCloseBtn</code> because it is only
            added to the default header. You can add your own close control in the header. Example:
          </p>
          <CodeBlock code={exampleCloseButtonCode} />
          <hr />
        </div>
      )}
    </>
  );
}
