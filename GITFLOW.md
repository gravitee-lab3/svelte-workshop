

```bash
export FEATURE_ALIAS="step1"
# git flow feature start "${FEATURE_ALIAS}"
export COMMIT_MESSAGE="feat.(${FEATURE_ALIAS}): setp 1, setup a new project"
# git add --all && git commit -m "${COMMIT_MESSAGE}" && git push -u origin HEAD

# git flow feature finish "${FEATURE_ALIAS}"

export FEATURE_ALIAS="step2"
# git flow feature start "${FEATURE_ALIAS}"
export COMMIT_MESSAGE="feat.(${FEATURE_ALIAS}): setp 2, coding components"
# git add --all && git commit -m "${COMMIT_MESSAGE}" && git push -u origin HEAD

# git flow feature finish "${FEATURE_ALIAS}"
```
