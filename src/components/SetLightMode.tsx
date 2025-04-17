import Script from 'next/script'

export function SetLightMode(): React.JSX.Element {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      id="light-theme-script"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    document.documentElement.setAttribute('data-theme', 'light')
  })();
  `,
      }}
    />
  )
}
