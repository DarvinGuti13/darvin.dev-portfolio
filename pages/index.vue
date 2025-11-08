<script setup lang="ts">
import Hero from '~/components/home/Hero.vue';
import About from '~/components/home/About.vue';
import TechStack from '~/components/home/TechStack.vue';
import ResumenSection from '~/components/home/ResumenSection.vue';
import ProjectsShowcase from '~/components/home/ProjectsShowcase.vue';
import ContactForm from '~/components/home/ContactForm.vue';


useSeoMeta({
  title: 'Inicio',
  description: 'Portafolio de Darvin Gutiérrez — Desarrollador de Software en Costa Rica.'
})
</script>

<template>
   <section >
      <Hero />
    </section>

 <section id="about" >
      <About />
    </section>

    <section id="techstack">
  <TechStack />
</section>


<section id="resumen" >
      <ResumenSection />
    </section>

    <section id="projects" >
      <ProjectsShowcase/>
    </section>

    <section id="contact" >
      <ContactForm/>
    </section>

</template>
