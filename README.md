# Sanity Clean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the community Slack](https://slack.sanity.io/?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)

## Useful notes
Prune records from deleted schemas using a concept akin to this, which will delete one instance of of `publicationAuthor` if it exists.

```
npx sanity documents query \
  "*[_type=='publicationAuthor'][0]._id" --apiVersion 2023-03-25 \
  | xargs npx sanity documents delete
```
