$(document).ready(function () {
    $.getJSON('../data/projetos.json', function (data) {
        console.log('Dados recebidos:', data);

        if (data && data.projetos) {
            const projetos = data.projetos;

            function exibirProjeto(proj) {
                if (proj) {
                    $('#projeto-img').attr('src', proj.imagem);
                    $('#projeto-nome').text(proj.nome);
                    $('#projeto-desc').text(proj.descricao);
                    if (Array.isArray(proj.tech)) {
                        const techList = proj.tech.map(t => `<li>${t}</li>`).join('');
                        $('#projeto-tech').html(techList);
                    } else {
                        $('#projeto-tech').html(`<li>${proj.tech}</li>`);
                    }

                    $('#projeto-repo').attr('href', proj.repo);
                    $('#projeto-online').attr('href', proj.online);
                } else {
                    console.error('Projeto não encontrado!');
                }
            }

            if (projetos[0]) {
                exibirProjeto(projetos[0]);
            } else {
                console.error('Projeto 0 não encontrado!');
            }

            projetos.forEach((proj, index) => {
                const thumb = `
                    <li>
                        <img class="thumb" src="${proj.imagem}" alt="Miniatura ${proj.nome}" data-id="${index}" width="80">
                    </li>
                `;
                $('.galeria').append(thumb);
            });

            $('.galeria').on('mouseenter', '.thumb', function () {
                const id = $(this).data('id');
                if (projetos[id]) {
                    exibirProjeto(projetos[id]);
                } else {
                    console.error('Projeto não encontrado para id', id);
                }
            });

        } else {
            console.error('Dados de projetos não encontrados no JSON!');
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log('Erro na requisição:', textStatus, errorThrown);
    });

    $('#menu-toggle').click(function () {
        $('nav ul').toggleClass('show');

        let expanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', !expanded);

        if (!expanded) {
            $(this).html('✕').attr('aria-label', 'Fechar menu');
        } else {
            $(this).html('☰').attr('aria-label', 'Abrir menu');
        }
    });

    $('nav ul li a').click(function () {
        if ($(window).width() <= 768) {
            $('nav ul').removeClass('show');
            $('#menu-toggle')
                .html('☰')
                .attr('aria-expanded', false)
                .attr('aria-label', 'Abrir menu');
        }
    });

    $(window).on('scroll', () => {

        var menuLinks = $('nav ul li a[href^="#"]');

        var sections = menuLinks.map(function () {
            var selector = $(this).attr('href');
            if (selector.length > 1) {
                return $(selector)[0];
            }
        });
        var scrollPos = $(window).scrollTop();
        var windowHeight = $(window).height();
        var documentHeight = $(document).height();

        var currentSectionId = null;

        sections.each(function (index, section) {
            var top = $(section).offset().top - 150;
            if (scrollPos >= top) {
                currentSectionId = section.id;
            }
        });

        if (scrollPos + windowHeight >= documentHeight - 10) {
            currentSectionId = sections.last().attr('id');
        }

        menuLinks.removeClass('ativo');
        if (currentSectionId) {
            menuLinks.filter('[href="#' + currentSectionId + '"]').addClass('ativo');
        }
    });
});