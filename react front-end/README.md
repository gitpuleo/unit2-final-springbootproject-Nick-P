Detail some debugging and testing for requirements:

Also didn't realize you needed to keep the naming conventions exactly equivalent when delcaring state, so I ran into an error where const [renderInterests, setRenderInterest] = useState(false); threw errors when run. Just that extra character throws it off. 