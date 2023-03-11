export function refMinDelay(
  sourceRef,
  delay,
  conditionToDoSomethingImmediate = newValue => newValue === true,
  doImmediate = newValue => true,
  doAfterDelay = newValue => false,
) {
  let timeId = 123
  const delayRef = ref(sourceRef.value)

  watch(sourceRef, () => {
    if (conditionToDoSomethingImmediate(sourceRef.value) === true) {
      clearTimeout(timeId)

      delayRef.value = doImmediate(sourceRef.value)

      timeId = setTimeout(() => {
        timeId = null

        if (conditionToDoSomethingImmediate(sourceRef.value) === true)
          return

        delayRef.value = doAfterDelay(sourceRef.value)
      }, delay)
    }
    else {
      if (timeId)
        return

      delayRef.value = doAfterDelay(sourceRef.value)
    }
  }, {
    immediate: true,
  })

  return delayRef
}
