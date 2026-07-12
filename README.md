# BioLAK

[Tiếng Việt](./README.vi.md)

- [Deployment](./docs/deployment.md)
- [Development](./docs/development.md)

> [!CAUTION]
> Do NOT run the production `just` commands (`just backup`, `just restore`, `just update`) in your development environment. These commands are specifically designed for the `~/biolak` directory on production servers and may cause data loss if used incorrectly in other environments.

## Internationalization

| Layer                  | Solution                               | Scope                                                       |
| ---------------------- | -------------------------------------- | ----------------------------------------------------------- |
| **Admin panel UI**     | Payload `i18n`                         | Labels, descriptions inside `/admin`                        |
| **Dynamic content**    | Payload `localization` (DB)            | Page body, product descriptions, etc.                       |
| **Frontend static UI** | `next-intl` with locale path prefixing | Buttons, errors, alt texts, form labels — all fixed strings |

Frontend routes are prefixed by locale (`/{locale}/...`). The middleware detects the user's preferred language from `Accept-Language` headers and redirects accordingly, then persists the choice in a cookie.
