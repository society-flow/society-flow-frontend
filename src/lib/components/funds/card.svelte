<script>
    const valProps = $props();
    console.log("valProps =", valProps)

</script>

<article>
    <main>
        Fund: {valProps.total} {valProps.currency}
    </main>
</article>